const { buildSchema } = require('graphql');

export const schema = buildSchema(`
  input UserInput {
    name: String!
    age: Int!
  }
  
  type AccessToken {
    access_token: String
  }

  type Artists {
    artists: [String]
  }

  type User {
    id: ID!
    name: String!
    age: Int!
    comments : [Comment]
  }

  type Comment {
    userId: ID!
    value: String
  }

  type Query {
    authenticate(code: String): AccessToken
    getArtists(term: String): Artists
    getUsers: [User]!
    getUser(id: ID): User
  }

  type Mutation {
    addUser(user: UserInput): User
    deleteUser(id: String): [User]
  }
`);
