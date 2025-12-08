import React from "react";
import { dummyRecentMessagesData } from "../assets/assets";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import api from "../api/axios";

const RecentMessages = () => {
  const [messages, setMessages] = useState([]);
  const {user} = useUser()
  const {getToken} = useAuth()

  const fetchRecentMessages = async () => {
    try {
      const token = await getToken()
      const {data} = await api.get('/api/user/recent-messages',{
        headers : {Authorization : `Bearer ${token}`}
      })
      if(data.success){
        // Group Messages by sender and get latest messages for each sender
        const groupedMessages = data.messages.reduce((acc,message)=>{
          const senderId = message.from_user_id._id
          if(!acc[senderId] || new Date(message.createdAt) > new Date(acc[senderId].createdAt)){
            acc[senderId] = message
          }
          return acc
        },{})

        // Sort messages by date

        const sortedMessage = Object.values(groupedMessages).sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt))

        setMessages(sortedMessage)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if(user){
      fetchRecentMessages();
      setInterval(fetchRecentMessages,30000)
      return ()=> {clearInterval()}
    }
  }, [user]);

  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="text-slate-800 mb-4 font-semibold">Recent Messages</h3>
      <div className="max-h-56 flex flex-col overflow-y-scroll no-scrollbar">
        {messages.map((message, index) => (
          <Link
            to={`/messages/${message.from_user_id._id}`}
            key={index}
            className="flex items-start gap-2 py-2 hover:bg-slate-100"
          >
            <img
              src={message.from_user_id.profile_picture}
              alt="profilePic"
              className="h-8 w-8 rounded-full"
            />
            <div className="w-full">
                <div className="flex justify-between">
                    <p className="font-semibold">{message.from_user_id.full_name}</p>
                    <p className="text-slate-400 text-[10px]">{moment(message.createdAt).fromNow()}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500">{message.text ? message.text : 'Media' }</p>
                {!message.seen && <p className="flex justify-center items-center rounded-full text-white bg-indigo-500 w-4 h-4 text-xs">1</p>}
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;
