import mongoose, { Schema, Document, Types } from "mongoose";

interface IPost extends Document {
  ipfsHash: string;
  owner: Types.ObjectId;
  likeId: string[];
  chainId: string;
}

export const PostSchema: Schema = new Schema({
  ipfsHash: { type: String, required: true, unique: true },
  chainId: { type: String, required: true },
  ownerId: { type: Types.ObjectId, ref: 'Profile', required: true },
  likeId: [{ type: Types.ObjectId, ref: "Profile" }],
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;