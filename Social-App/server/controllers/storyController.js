import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Story from "../models/Story.js";
import User from "../models/User.js";
import { inngest } from "../inngest/index.js";

// Add user story

export const addStory = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, media_type, background_colour } = req.body;
    const media = req.file;
    let media_urls = "";

    if (media_type === "image") {
      const fileBuffer = fs.readFileSync(media.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: media.originalname,
      });
      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
      media_urls = url;
    }
    if (media_type === "video") {
      const fileBuffer = fs.readFileSync(media.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: media.originalname,
      });
      const url = imagekit.url({
        path: response.filePath
      });
      media_urls = url;
    }

    // Create story
    const story = await Story.create({
        user: userId,
        content,
        media_urls,
        media_type,
        background_colour,
    })

    // Schedule story deletion after 24 hours

    await inngest.send({
        name : "app/story.delete",
        data : {storyId : story._id}
    })

    res.json({ success: true, message: "Story created successfully."});

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user stories

export const getStories = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findById(userId);

        // User's connections and followings

        const userIds = [userId, ...user.connections, ...user.following]

        const stories = await Story.find({
            user : {$in : userIds}
        }).populate('user').sort({createdAt : -1});

        res.json({success : true , stories});

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
