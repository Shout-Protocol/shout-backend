import mongoose, { Schema } from "mongoose";


interface IProfile extends Document {
  walletAddress: string;
  name: string;
  avatar: string;
  boi: string;
}


export const ProfileSchema: Schema = new Schema({
  walletAddress: { type: String, required: true, unique: true },
  name: { type: String },
  avatar: { type: String },
  bio: { type: String },
});

const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;