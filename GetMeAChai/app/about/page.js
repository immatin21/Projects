import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-violet-300">
          About This Project
        </h1>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
          This platform is a <span className="text-violet-400 font-semibold">Patreon-style clone</span> built with{" "}
          <span className="text-blue-400">Next.js 13 (App Router)</span>,{" "}
          <span className="text-green-400">MongoDB</span>, and{" "}
          <span className="text-purple-400">Razorpay</span> for payments.
          <br />
          It allows creators to showcase their work, receive one-time or recurring
          support, and build a community around their content.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-violet-500/20 transition">
            <h2 className="text-2xl font-semibold text-violet-200 mb-3">
              🔑 Features
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>✨ User authentication with NextAuth</li>
              <li>💳 Secure payments via Razorpay</li>
              <li>📂 Profile management with cover & profile images</li>
              <li>🎉 Creator supporter wall with messages</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/20 transition">
            <h2 className="text-2xl font-semibold text-violet-200 mb-3">
              🛠️ Tech Stack
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>⚡ Next.js 13 App Router</li>
              <li>🌐 NextAuth.js for authentication</li>
              <li>🗄️ MongoDB & Mongoose for data storage</li>
              <li>💳 Razorpay API integration</li>
              <li>🎨 Tailwind CSS for styling</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-gray-300 leading-relaxed text-lg">
          <p className="mb-4">
            As a <span className="text-violet-400 font-semibold">creator</span>, you can
            set up your profile, add a cover photo, share your content, and
            start receiving support from your fans. Supporters can send one-time
            donations or recurring contributions to help you continue building
            amazing things.
          </p>
          <p>
            This project is designed to make supporting creators{" "}
            <span className="text-green-400 font-semibold">simple, transparent,
            and secure</span>. Every payment is processed safely through Razorpay
            and instantly recorded in your dashboard so you can track your growth
            over time.
          </p>
        </div>

        <div className="mt-12">
          <p className="text-white bg-black/30 p-4 rounded-lg hover:bg-black/50 transition">
            Built with ❤️ by{" "}
            <span className="text-violet-300 font-semibold">Matin Mondal</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

export const metadata = {
  title: "About - Get Me A Chai!",
};