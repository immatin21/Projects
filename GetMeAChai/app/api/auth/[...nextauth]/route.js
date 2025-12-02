import NextAuth from "next-auth";
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import mongoose from "mongoose";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";

export const authOptions = NextAuth({
secret: process.env.NEXTAUTH_SECRET,
providers: [
// OAuth authentication providers...
GitHubProvider({
clientId: process.env.GITHUB_ID,
clientSecret: process.env.GITHUB_SECRET,
}),
GoogleProvider({
clientId: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}),

// AppleProvider({  
//   clientId: process.env.APPLE_ID,  
//   clientSecret: process.env.APPLE_SECRET  
// }),  
// FacebookProvider({  
//   clientId: process.env.FACEBOOK_ID,  
//   clientSecret: process.env.FACEBOOK_SECRET  
// }),  
// GoogleProvider({  
//   clientId: process.env.GOOGLE_ID,  
//   clientSecret: process.env.GOOGLE_SECRET  
// }),  
// // Passwordless / email sign in  
// EmailProvider({  
//   server: process.env.MAIL_SERVER,  
//   from: 'NextAuth.js <no-reply@example.com>'  
// }),

],

callbacks: {
async signIn({ user, account, profile, email, credentials }) {
if (account.provider === "github" || account.provider === "google")  {
// Ensure DB connection is ready before any queries
await connectDb();

// Check if user exists  
    let currentUser = await User.findOne({ email: user.email });  
    if (!currentUser) {  
      // Create new user  
      const newUser = new User({  
        username: user.email.split("@")[0],  
        email: user.email,  
      });  
      await newUser.save();  
      user.name = newUser.username;  
        
    } else {  
      user.name = currentUser.username;  
    }  
    return true;  
  }  
  return false;  
},

},
});

export { authOptions as GET, authOptions as POST };

