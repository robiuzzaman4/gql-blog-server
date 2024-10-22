export const typeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    published: Boolean!
    createdAt: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    user: User!
  }
    
  
  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ) : createUserResponse
  } 

  type createUserResponse {
    token: String
  }
`;
