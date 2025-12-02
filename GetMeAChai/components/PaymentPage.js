"use client";

import React, { useState, useEffect, use } from "react";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { initiate, fetchUser, fetchPayment } from "@/actions/serverAction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { data: session, status } = useSession();
  const [ActiveTab, setActiveTab] = useState("Supporters");
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState({});
  const [Payments, setPayments] = useState([]);
  const SearchParams = useSearchParams();

  // useEffect(() => {
  //    GetData();
  // }, [username]);

  const tabClass = (tab) =>
    `cursor-pointer pb-1 ${
      ActiveTab === tab
        ? "border-b-2 border-violet-200 text-white"
        : "text-white/80 hover:text-white"
    }`;

  let paymentAmount = Payments.reduce((a, b) => a + b.amount, 0);

  const [paymentForm, setpaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  const handleChange = (e) => {
    setpaymentForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      GetData();
    }
  }, [status, session, username]);

  useEffect(() => {
    if (SearchParams.get("paymentdone") === "true") {
      toast("Thanks for Donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, []);

  const GetData = async () => {
    if (!session.user.email) {
      console.warn("No session yet, skipping fetchUser");
      return;
    }
    try {
      let u = await fetchUser(session.user.email);
      setCurrentUser(u);
      let dbpayments = await fetchPayment(u.username);
      setPayments(dbpayments);
    } catch (err) {
      console.error("Error fetching user/payments:", err);
    }
  };

  const pay = async (amount) => {
    let a = await initiate(amount, currentUser.username, paymentForm);
    let orderId = a.id;

    var options = {
      key: currentUser.razorpayId || process.env.NEXT_PUBLIC_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentForm.name || " ",
        email: "gaurav.kumar@example.com",
        contact: "+919876543210",
      },
      notes: { address: "Razorpay Corporate Office" },
      theme: { color: "#3399cc" },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="light"
        transition={Bounce}
      />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover w-full flex justify-center items-center relative my-5 ">
        <img
          className="h-48 md:h-[350px] object-cover w-full"
          src={currentUser.CoverPic || "/default.png"}
          // onError={(e) => (e.currentTarget.src = "/CoverPic.png")}
          alt="Cover"
        />
        <div className="absolute -bottom-14 border border-gray-500 rounded-3xl bg-black">
          <img
            className="rounded-3xl"
            width={120}
            src={currentUser.ProfilePic || "/avatar.gif"}
            // onError={(e) => (e.currentTarget.src = "/ProfilePic.png")}
            alt="Profile"
          />
        </div>
      </div>

      <div className="info ">
        <div className="text-white text-center py-10 rounded-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {currentUser.username}
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-4">
            Lets help {username} to make more awesome content
          </p>

          <div className="text-gray-400 text-sm mb-6 space-x-3">
            {/* show loading if payments length greater than 0 */}
            <span>{Payments.length === 0 && <div>Loading...</div>}</span>
            <span>{Payments.length} Payments</span>
            <span>&bull;</span>
            <span>{currentUser.name}</span>
            <span>&bull;</span>
            <span>has raised ₹{paymentAmount}</span>
          </div>

          <div className="space-y-2">
            <button className="bg-violet-100 text-black font-semibold px-6 py-2 rounded-md hover:bg-violet-200">
              Join for free
            </button>
            <br />
            <button className="bg-gray-800 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700">
              See membership options
            </button>
          </div>

          <div className="mt-10 flex justify-center gap-10 text-sm font-medium text-violet-200 border-b-1 border-gray-700">
            <span
              onClick={() => setActiveTab("Supporters")}
              className={tabClass("Supporters")}
            >
              Supporters
            </span>
            <span
              onClick={() => setActiveTab("Donation")}
              className={tabClass("Donation")}
            >
              Donation
            </span>
          </div>

          <div className="payment pb-5">
            {ActiveTab === "Supporters" && (
              <div className="supporters mt-5 p-5 container md:mx-auto  w-full md:w-[50vw] rounded-2xl">
                <ul className="text-md text-gray-300 flex flex-col gap-3 w-full">
                  {Payments && Payments.length === 0 ? (
                    <p className="text-center">
                      No supporters yet. Be the first one to support!
                    </p>
                  ) : (
                    Payments.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 bg-gray-800 px-4 py-2 rounded-lg flex-wrap"
                      >
                        <div className="flex justify-center items-center gap-5">
                        <div>
                          <img
                            width={30}
                            src="./avatar.gif"
                            alt="supporter avatar"
                            className="rounded-full flex-shrink-0 mt-1"
                          />
                        </div>
                        <div className="flex flex-col text-sm items-start">
                          <span>
                            <b>{p.name}</b> donated{" "}
                            <b className="text-green-400">₹{p.amount}</b>
                          </span>
                          <span className="flex items-start ">
                            with a message:{" "}
                            {p.message === "" ? "Good Work" : p.message}
                          </span>
                        </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
            {ActiveTab === "Donation" && (
              <div className="max-w-md md:mx-auto bg-[#101827] text-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-700 mt-5 mx-5">
                <h2 className="text-xl font-semibold mb-2">Make a Payment</h2>

                <form className="space-y-4 ">
                  <input
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                    value={paymentForm.name}
                    className="w-full px-4 py-2 bg-[#1e293b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  />
                  <input
                    name="message"
                    placeholder="Enter Message"
                    onChange={handleChange}
                    value={paymentForm.message}
                    className="w-full px-4 py-2 bg-[#1e293b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  />
                  <input
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={handleChange}
                    value={paymentForm.amount}
                    className="w-full px-4 py-2 bg-[#1e293b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                  />

                  <button
                    onClick={() => pay(paymentForm.amount * 100)}
                    type="button"
                    className="w-full py-2 rounded-md disabled:bg-slate-800 disabled:from-purple-100 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 font-semibold transition duration-300"
                    disabled={
                      paymentForm.name?.length < 4 ||
                      paymentForm.message?.length < 5 ||
                      paymentForm.amount == 0
                    }
                  >
                    Pay
                  </button>
                </form>

                <div className="flex justify-center gap-4 pt-2">
                  {[10, 20, 30].map((amount) => (
                    <button
                      key={amount}
                      // onClick={() => setQuickAmount(amount.toString())}
                      className="bg-gray-800 hover:bg-gray-700 text-sm px-4 py-1.5 rounded-md transition duration-200"
                      onClick={() => pay(amount * 100)} // Convert to paise
                    >
                      Pay ₹{amount}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* <div className="bg-gray-700 h-1"></div> */}
          {/* border-b-2 border-white pb-1 */}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
