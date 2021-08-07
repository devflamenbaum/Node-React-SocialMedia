import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, GridColumn, Transition } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'

import { FETCH_POSTS_QUERY } from '../utils/graphql'

import PostCard from '../components/PostCard/PostCard'
import PostForm from '../components/PostForm/PostForm'

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    const { user } = useContext(AuthContext)

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                { loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <Transition.Group >
                    {data && data.getPosts.map(post => (
                        <GridColumn key={post.id} style={{ marginBottom: 20}}>
                            <PostCard post={post} />
                        </GridColumn>
                    ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    )
}

export default Home;

