import gql from "graphql-tag";

const typeDefs = gql`
  type Profile {
    _id: ID!
    walletAddress: String!
    name: String
    avatar: String
    bio: String
    post: [Post]
  }

  type Post {
    _id: ID!
    ipfsHash: String!
    owner: Profile
    ownerId: ID!
    likeId: [ID]
    like: [Profile]
    comment: [Comment]
  }

  type Comment {
    _id: ID!
    message: String!
    postId: ID!
    ownerId: ID!
    likeId: [ID]
    like: [Profile]
    owner: Profile
  }

  type Query {
    hello: String
    profiles: [Profile]
    profile(walletAddress: String!): Profile
    posts: [Post]
  }

  type Mutation {
    # Pass
    createProfile(profile: CreateProfileInput!): Profile
    updateProfile(id: ID!, profile: UpdateProfileInput!): Profile
    createPost(ipfsHash: String!, ownerId: ID!): Post
    createComment(comment: CreateCommentInput!): Comment
    updateComment(id: ID!, comment: UpdateCommentInput!): Comment
    likePost(postId: ID!, ownerId: ID!): Post
    unLikePost(postId: ID!, ownerId: ID!): Post
    likeComment(commentId: ID!, ownerId: ID!): Comment
    unLikeComment(commentId: ID!, ownerId: ID!): Comment
    # ---
    # updatePost(id: ID!, post: UpdatePostInput!): Post
    # deletePost(id: ID!): Post
    # createComment, updateComment, deleteComment(Hide),
    deleteComment(id: ID!): Comment
  }

  input CreateProfileInput {
    walletAddress: String!
    name: String
    avatar: String
    bio: String
  }
  input UpdateProfileInput {
    name: String
    avatar: String
    bio: String
  }
  input UpdatePostInput {
    ipfsHash: String!
  }
  input CreateCommentInput {
    message: String!
    postId: ID!
    ownerId: ID!
  }
  input UpdateCommentInput {
    message: String!
  }
`;

export default typeDefs;
