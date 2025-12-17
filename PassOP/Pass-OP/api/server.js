import { MongoClient } from "mongodb";
import clientPromise from "../configs/db";

const client = new MongoClient(process.env.MONGO_URI);
const dbName = "PassOP";

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

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
