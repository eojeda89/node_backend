const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        getAllAnimals: async (parents, args, context) => {
            return context.prisma.animal.findMany()
        }
    }
}

const server = new ApolloServer({
    typeDefs: readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    )