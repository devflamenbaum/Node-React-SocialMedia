import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
{
    getPosts{
        id
        body
        createdAt
        username
        likes{
            id
        username
        }
        comment{
            id
            body
        }
        likeCount
        commentCount
    }
}
`