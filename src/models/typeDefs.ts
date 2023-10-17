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
    post: Post!
    owner: Profile!
    like: [Profile]
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
    updateProfile(id: ID!, profile: UpdateProfile!): Profile
    createPost(ipfsHash: String!, ownerId: ID!): Post
    # ---
    # updatePost, deletePost(Hide),
    # createComment, updateComment, deleteComment(Hide),
    # likePost, likeComment, unlikePost, unlikeComment,
  }

  input CreateProfileInput {
    walletAddress: String!, name: String, avatar: String, bio: String
  }
  input UpdateProfile {
    name: String, avatar: String, bio: String
  }
`;

export default typeDefs;
