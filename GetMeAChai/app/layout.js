import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get Me  A Chai!",
  description: "A crowdfunding platform for creators to fund their projects.",
  icons: [
    { rel: 'icon', url: '/favicon-32.png', sizes: '32x32' }
  ]
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] overflow-x-hidden text-white`}
      >
        <SessionWrapper>
          <Navbar/>
            <div className="min-h-screen pt-20">
              {children}
            </div>
          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
