import React from 'react'
import App from './App'
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token ? 'Bearer ' + token : ''
        }
    }
})


const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})



export default function ApolloProviderClient(){
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}