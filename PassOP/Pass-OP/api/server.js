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

    if (req.method === "GET") {
      const data = await collection.find({}).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      await collection.insertOne(req.body);
      return res.status(201).json({ success: true });
    }

    if (req.method === "DELETE") {
      await collection.deleteOne(req.body);
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
