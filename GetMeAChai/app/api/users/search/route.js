import connectDb from "@/db/connectDB";
import User from "@/models/User";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.trim() || "";

  if (!query) return new Response(JSON.stringify([]), { status: 200 });

  try {
    await connectDb();

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).limit(10);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
