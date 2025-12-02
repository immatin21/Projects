"use server";

import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";
import User from "@/models/User";
import Payment from "@/models/Payment";

export const initiate = async (amount, to_username, paymentForm) => {
  await connectDb();

  const user = await User.findOne({ username: to_username });
  if (!user) throw new Error("User not found");

  const secret = user.razorpaySecret;

  const instance = new Razorpay({
    key_id: user.razorpayId || process.env.RAZORPAY_ID,
    key_secret: secret || process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: Number.parseInt(amount),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const x = await instance.orders.create(options);

  await Payment.create({
    o_id: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentForm.name,
    message: paymentForm.message,
  });

  return x;
};

export const fetchUser = async (email) => {
  await connectDb();
  const u = await User.findOne({ email });
  if (!u) return null;
  return JSON.parse(JSON.stringify(u));
};

export const fetchPayment = async (username) => {
  await connectDb();
  const user = await User.findOne({ username }).lean();
  if (!user) return [];

  const usernames = [user.username, ...(user.previous_usernames || [])];

  const payments = await Payment.find({
    to_user: { $in: usernames },
    done: true,
  })
    .sort({ amount: -1 })
    .limit(10)
    .lean();

  return JSON.parse(JSON.stringify(payments));
};

export const updateProfile = async (data, email, oldusername) => {
  await connectDb();
  const ndata = data; 

  if (oldusername !== ndata.username) {
    const u = await User.findOne({ username: ndata.username });
    if (u) throw new Error("Username already exists");

    await User.updateOne(
      { email },
      {
        $set: ndata,
        $push: { previous_usernames: oldusername },
      }
    );
  } else {
    await User.updateOne({ email }, { $set: ndata });
  }

return JSON.parse(JSON.stringify(await User.findOne({ email }).lean()));
};
