import { fetchUser } from "@/actions/serverAction";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import User from "@/models/User";
import connectDb from "@/db/connectDB";

const Username = async({ params }) => {
  const { username } = await params;
  const currentUser = await fetchUser(username);

  const userExists = async() => {
    await connectDb();
    let u = await User.findOne({ username: username });
    if(!u){
      return notFound();
    }
  }
  await userExists();

  return <PaymentPage username={username} currentUser={currentUser}/>;
}

export default Username

// dynamic page metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai!`
  };
}