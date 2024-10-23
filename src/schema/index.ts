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
    profile(userId: ID!): Profile
  }

  type Mutation {
    signup(
      name: String!
      email: String!
      password: String!
      bio: String
    ) : AuthPayload

    signin(
      email: String!
      password: String!
    ) : AuthPayload

    createPost(
      title: String!
      content: String!
    ) : PostPayload
  } 

  type AuthPayload {
    token: String
    message: String
  }
  
  type PostPayload {
    message: String
    post: Post
  }
`;
