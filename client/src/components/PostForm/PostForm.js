import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../utils/graphql'
import { toast } from 'react-toastify';

import { useForm } from '../../hooks/hooks'

function PostForm(props) {

    const { handleSubmit, handleOnChange, values } = useForm(createPostCallback, {
        body: ''
    })

    const [ createPost ] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            
            let newData = [...data.getPosts]
            newData = [result.data.createPost,...newData]            
            proxy.writeQuery({ 
                query: FETCH_POSTS_QUERY, 
                data: { ...data, getPosts: { newData }},
            })
            values.body = ''
        },
        onError(error){
            const { message } = error.graphQLErrors && error.graphQLErrors[0]
            toast.error(<div style={{display: 'flex', alignItems: 'center'}}><Icon name="times circle" style={{fontSize: 20, marginRight: 10}}/>{message}</div>)
        }
    })

    function createPostCallback(){
        createPost()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Create a new Post</h2>
            <Form.Field>
                <Form.Input 
                    placeholder="Hi world..."
                    name="body"
                    onChange={handleOnChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">Submit</Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comment{
                id body username createdAt
            }
            commentCount
        }
    }
`

export default PostForm
