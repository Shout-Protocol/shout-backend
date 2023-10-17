import mongoose, { Schema, Types } from "mongoose";

export const CommentSchema: Schema = new Schema({
  message: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'Profile', required: true },
  postId: { type: Types.ObjectId, ref: "Post" },
  likeId: [{ type: Types.ObjectId, ref: "Profile", unique: true }],
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;