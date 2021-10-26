const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')
const path = require('path')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args, context, info) => {
            return links.find(item => item.id === args.id)
        }
    },
    // Link: {
    //     id: parent => parent.id,
    //     description: parent => parent.description,
    //     url: parent => parent.url,
    // },
    Mutation: {
        post: (parent, args, context, info) => {
            let idCount = links.length
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args, context, info) => {
            const index = links.findIndex(item => item.id === args.id)
            if (index != null) {
                args.description && (links[index].description = args.description);
                args.url && (links[index].url = args.url)
                return links[index]
            }
        },
        deleteLink: (parent, args, context, info) => {
            const index = links.findIndex(item => item.id === args.id)
            if (index != null) {
                return links.splice(index,1)[0]
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context:{
        prisma
    }
})

server
    .listen()
    .then(({ url }) => console.log('Server is running on ' + url))