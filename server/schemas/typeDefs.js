const typeDefs = `
    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: SaveBookInput!): User
        removeBook(bookId: String!): User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        bookId: String!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input SaveBookInput {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
`

module.exports = typeDefs;