"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUser, updateProfile } from "@/actions/serverAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { set } from "mongoose";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      GetData();
    }
  }, [session, router]);

  const GetData = async () => {
    setLoading(true);
    try {
      let userData = await fetchUser(session.user.email);
      setform(userData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(
        form,
        session.user.email,
        form.username
      );

      toast.success("Profile Updated!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
        onClose: () => router.push(`/${updatedUser.username}`)
      });

      setTimeout(() => {router.push(`/${updatedUser.username}`);}, 2500);
      // router.push(`/${updatedUser.username}`);
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "Update failed!");
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-transparent border border-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300";

  const blurredClass = loading ? "blur-sm animate-pulse" : "";

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-lg text-white p-6 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Welcome to your Dashboard
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md mb-1">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name || ""}
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-md mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={form.email || ""}
                placeholder="Enter your email"
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-md mb-1">Username</label>
              <input
                type="text"
                name="username"
                onChange={handleChange}
                value={form.username || ""}
                placeholder="Create a username"
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-md mb-1">Profile Picture</label>
              <input
                type="text"
                name="ProfilePic"
                onChange={handleChange}
                value={form.ProfilePic || ""}
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
                placeholder="Profile image URL"
              />
            </div>

            <div>
              <label className="block text-md mb-1">Cover Picture</label>
              <input
                type="text"
                name="CoverPic"
                onChange={handleChange}
                value={form.CoverPic || ""}
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
                placeholder="Cover image URL"
              />
            </div>

            <div>
              <label className="block text-md mb-1">Razorpay Id</label>
              <input
                type="text"
                name="razorpayId"
                onChange={handleChange}
                value={form.razorpayId || ""}
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
                placeholder="Enter your Razorpay Id"
              />
            </div>

            <div>
              <label className="block text-md mb-1">Razorpay Secret</label>
              <input
                type="text"
                name="razorpaySecret"
                onChange={handleChange}
                value={form.razorpaySecret || ""}
                className={`${inputClass} ${blurredClass}`}
                disabled={loading}
                placeholder="Enter your Razorpay Secret"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-md transition duration-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
