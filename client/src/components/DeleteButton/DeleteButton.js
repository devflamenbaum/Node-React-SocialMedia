import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Icon } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../../utils/graphql'

function DeleteButton({ postId, commentId, callback }) {

    const [confirmOpen, setConfiirmOpen] = useState(false)

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy){
            setConfiirmOpen(false)
            if(!commentId){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
    
                data.getPosts = data.getPosts.filter(p => p.id !== postId);
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
            }
            if(callback) callback()
        },
        variables: {
            postId, 
            commentId
        }
    })

    return (
        <>
            <Button as="div" color='red' floated="right" onClick={() => setConfiirmOpen(true)}>
              <Icon name="trash" style={{margin: 0}}/>
            </Button>
            <Confirm open={confirmOpen} onCancel ={() => setConfiirmOpen(false)} onConfirm={deletePostOrMutation} />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql `
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comment{
                id username createAt body
            }
            commentCount
        }
    }
`

export default DeleteButton
