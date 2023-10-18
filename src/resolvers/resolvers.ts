import { Resolvers } from "../generated/graphql";
import Post from "../models/post";
import Profile from "../models/profile";
import Comment from "../models/comment";

const resolvers: Resolvers = {
  // QueryResolver
  Query: {
    hello: () => "Hello world!",
    profiles: async () => await Profile.find({}),
    profile: async (_, args) =>
      await Profile.findOne({ walletAddress: args.walletAddress }),
    posts: async () => await Post.find({}),
  },
  Profile: {
    post: async (parent) => await Post.find({ ownerId: parent._id }),
  },
  Post: {
    owner: async (parent) => await Profile.findOne({ _id: parent.ownerId }),
    comment: async (parent) => await Comment.find({ postId: parent._id }),
    like: async (parent) =>
      await Profile.find({
        _id: { $in: parent.likeId },
      }),
  },
  // MutationResolver
  Mutation: {
    createProfile: async (_, args) => {
      const { _id } = await Profile.create(args.profile);
      return await Profile.findOne({ _id });
    },
    updateProfile: async (_, args) => {
      const profile = await Profile.findByIdAndUpdate(args.id, args.profile, {
        new: true,
      });
      return await Profile.findOne({ _id: profile?._id });
    },
    createPost: async (_, args) => {
      const { _id } = await Post.create(args);
      return await Post.findOne({ _id });
    },
    // ----
    // updatePost: async (_, args) => {
    //   const post = await Post.findByIdAndUpdate(args.id, args.post, {
    //     new: true,
    //   });
    //   return await Post.findOne({ _id: post?._id });
    // },
    // deletePost: async (_, args) => {
    //   const post = await Post.findByIdAndDelete(args.id);
    //   return await Post.findOne({ _id: post?._id });
    // }
    createComment: async (_, args) => {
      const { _id } = await Comment.create(args.comment);
      return await Comment.findById({ _id });
    },
    updateComment: async (_, args) => {
      const comment = await Comment.findByIdAndUpdate(args.id, args.comment, {
        new: true,
      });
      return await Comment.findOne({ _id: comment?._id });
    },
    deleteComment: async (_, args) => {
      const comment = await Comment.findByIdAndDelete(args.id);
      return await Comment.findOne({ _id: comment?._id });
    },
    // FIXME: Duplicate likeId
    likePost: async (_, args) => {
      const post = await Post.findByIdAndUpdate(
        args.postId,
        { $push: { likeId: args.ownerId } },
        { new: true }
      );
      return await Post.findById(post?._id);
    },
    unLikePost: async (_, args) => {
      const post = await Post.findByIdAndUpdate(
        args.postId,
        { $pull: { likeId: args.ownerId } },
        { new: true }
      );
      return await Post.findById(post?._id);
    },
    likeComment: async (_, args) => {
      const comment = await Comment.findByIdAndUpdate(
        args.commentId,
        { $push: { likeId: args.ownerId } },
        { new: true }
      );
      return await Comment.findById(comment?._id);
    },
    unLikeComment: async (_, args) => {
      const comment = await Comment.findByIdAndUpdate(
        args.commentId,
        { $pull: { likeId: args.ownerId } },
        { new: true }
      );
      return await Comment.findById(comment?._id);
    }
  },
};

export default resolvers;
