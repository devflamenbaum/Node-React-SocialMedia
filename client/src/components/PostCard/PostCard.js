import React, { useContext } from 'react'
import { Card, Image, Icon, Label, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../../context/auth'

import LikeButton from '../LikeButton/LikeButton'
import DeleteButton from '../DeleteButton/DeleteButton'

function PostCard({ post }) {

    const { id, body, createdAt, username,likeCount, commentCount, likes} = post

    const { user } = useContext(AuthContext)

    return (
        <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt, 'YYYYMMDD').fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra style={{display: 'flex', justifyContent: 'space-between'}}>
        <LikeButton user={user} post={{ id, likes, likeCount}}/>

        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
        <Button color='black' basic>
            <Icon name='comment outline' />
        </Button>
            <Label as='a' basic color='black' pointing='left'>
                {commentCount}
            </Label>
        </Button>
        { user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
    )
}

export default PostCard
