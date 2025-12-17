import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("PassOP");
    const collection = db.collection("Passwords");

    // 🔐 Get user identity from Auth0 (frontend)
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ GET: only logged-in user's passwords
    if (req.method === "GET") {
      const data = await collection
        .find({ userId })
        .toArray();

      return res.status(200).json(data);
    }

    // ✅ POST: save password for logged-in user
    if (req.method === "POST") {
      await collection.insertOne({
        userId,
        ...req.body
      });

      return res.status(201).json({ success: true });
    }

    // ✅ DELETE: delete only user's own password
    if (req.method === "DELETE") {
      const { id } = req.body;

      await collection.deleteOne({
        id,
        userId
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message
    });
  }
}
