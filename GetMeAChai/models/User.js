import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  previous_usernames: {
    type: [String],
    default: [],
  },

  ProfilePic: { type: String },
  CoverPic: { type: String },
  razorpayId: { type: String },
  razorpaySecret: { type: String },
  createdat: { type: Date, default: Date.now },
  updatedat: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
