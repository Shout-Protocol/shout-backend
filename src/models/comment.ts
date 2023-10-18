import mongoose, { Schema, Types } from "mongoose";

interface IComment extends Document {
  message: string;
  ownerId: Types.ObjectId;
  postId: Types.ObjectId;
  likeCommentId: string[];
}

export const CommentSchema: Schema = new Schema({
  message: { type: String, required: true },
  ownerId: { type: Types.ObjectId, ref: 'Profile', required: true },
  postId: { type: Types.ObjectId, ref: "Post", required: true },
  likeId: [{ type: Types.ObjectId, ref: "Profile" }],
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;