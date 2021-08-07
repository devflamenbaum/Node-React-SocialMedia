const { ApolloServer, PubSub }  = require('apollo-server')
const mongoose                  = require('mongoose')
const typeDefs                  = require('./gql/typeDefs')
const resolvers                 = require('./gql/resolvers')

require('dotenv').config()

const pubsub = new PubSub()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
})


mongoose.connect(
    "mongodb+srv://"+ process.env.MONGO_USERNAME+":"+process.env.MONGO_PASSWORD+"@cluster-dev.wpeqn.mongodb.net/mergnDB?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log("MongoDB connected")
        return server.listen({ port: 5000})
    }).then(res =>{
        console.log(`Server running at: ${res.url}`)
    })