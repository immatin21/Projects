import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";
import fs from "fs";

// Get user data  using UserID from Clerk
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update user data
export const updateUserData = async (req, res) => {
  try {
    const userId = req.auth();

    const { username, bio, loacation, full_name } = req.body;

    const tempUser =
      User.findById(userId)(!username) && (username = tempUser.username);

    if (tempUser.username !== username) {
      const user = await User.findOne({ username });
      if (user) {
        // Not update username if already taken
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      loacation,
      full_name,
    };

    const profile = req.files.profile && req.files.profile[0];
    const cover = req.files.cover && req.files.cover[0];

    if (profile) {
      // Upload profile image to ImageKit
      const buffer = fs.readFileSync(profile.path);
      const response = await imagekit.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      });

      updatedData.profile_picture = url;
    }

    if (cover) {
      // Upload cover image to ImageKit
      const buffer = fs.readFileSync(cover.path);
      const response = await imagekit.upload({
        file: buffer,
        fileName: cover.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      updatedData.cover_photo = url;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json({ success: true, user, message: "Profile updated successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Find users by username, email , loaction , full_name

export const discoverUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const input = req.body 

    const allUsers = await User.find({
      $or: [
        { username : new RegExp(input, 'i') },
        { full_name : new RegExp(input, 'i') },
        { email : new RegExp(input, 'i') },
        { location : new RegExp(input, 'i') }
      ]  
    })

    const filteredUsers = allUsers.filter(user => user._id !== userId);
    res.json({ success: true, users: filteredUsers });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Follow User

export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const id = req.body 

    const user = await User.findById(userId);

    if(user.following.includes(id)){
        return res.json({ success: false, message: "You are already following this user" });
    }

    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);
    await toUser.save();

    res.json({ success: true, message: "User followed successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Unfollow User

export const unFollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const id = req.body 

    const user = await User.findById(userId);

    user.following = user.following.filter(user => user !== id)
    await user.save()

    const toUser = await User.findById(id);
    toUser.followers = toUser.followers.filter(user => user !== userId)
    await toUser.save()

    res.json({ success: true, message: "User Unfollowed successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
