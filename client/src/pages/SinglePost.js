import React, { useContext, useState, useRef} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client';
import { Grid, Image, Card, Button, Icon, Label, Form } from 'semantic-ui-css'
import moment from 'moment'

import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton/LikeButton';
import DeleteButton from '../components/DeleteButton/DeleteButton'

function SinglePost(props) {
    const postId = props.match.params.postId
    const [creatingComment, setCreatingComment] = useState('')
    const { user } = useContext(AuthContext)
    const commentInputRef = useRef(null)

    const { data: { getPost }} = useQuery(FETCH_POSTS_QUERY, {
        variables: {
            postId
        }
    })
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update(){
            setCreatingComment('')
            commentInputRef.current.blur()
        },
        variables: {
            postId,
            body: creatingComment
        }
    })


    let postMarkup;

    const deletePostCallback = () => props.history.push('/')

    if(!getPost){
        postMarkup = <p>Loading...</p>
    } else {
        const { id, body, createdAt, username, likeCount, commentCount, likes, comment } = getPost;

        postMarkup =(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}}/>
                                <Button 
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('comment on post')}>
                                        <Button basic color="teal">
                                            <Icon name='comment outline' />
                                        </Button>
                                        <Label basic color="teal" pointing="left">{commentCount}</Label>
                                </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        { user && (
                            <Card fluid >
                                <Card.Content>
                                <p>Post a Comment...</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input type="text" placeholder="Comment..." name="comment" value={creatingComment} 
                                        onChange={(event) => setCreatingComment(event.target.value)}  ref={commentInputRef}/>
                                        <button type="submit" className="ui button teal" disabled={creatingComment.trim() === ''} onClick={createComment}>Submit</button>
                                    </div>
                                </Form>
                                </Card.Content>
                            </Card>
                        )}
                        { comment.map(c => (
                            <Card fluid key={c.id}>
                                <Card.Content>
                                    {user && username === c.username && (
                                        <DeleteButton postId={id} commentId={c.id}/>
                                    )}
                                    <Card.Header>{c.username}</Card.Header>
                                    <Card.Meta>{moment(c.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{c.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return (
        postMarkup
    )
}

const CREATE_COMMENT_MUTATION = gql`
    mutation($postId: String!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            comment{
                id body createdAt username
            }
            commentCount
        }
    }
`

const FETCH_POSTS_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId){
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comment{
                id username createdAt body
            }
        }
    }
`

export default SinglePost
