import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect(process.env.ATLAS_URI || "");

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => console.log("Connected to MongoDB"));
};

export default { connect };
