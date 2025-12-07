import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import React from "react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const PostCards = ({ post }) => {

    const {getToken} = useAuth()
    const postwithHashtags = post.content.replace(/(#\w+)/g, '<span class="text-indigo-500"> $1 </span>')
    const [likes, setLikes] = useState(post.likes_count);
    const currentUser = useSelector((state)=>state.user.value)

    const handleLike = async () => {
        try {
          const {data} = await api.post('/api/post/like', {postId : post._id},
            {headers : {Authorization : `Bearer ${await getToken()}`}}
          )
          if(data.success){
            toast.success(data.message)
            setLikes(prev =>{
              if(prev.includes(currentUser._id)){
                return prev.filter(id=> id !== currentUser._id)
              }
              else{
                return [...prev,currentUser._id]
              }
            })
          }else{
            toast(data.message)
          }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
      {/* User Info */}
      <div onClick={()=>navigate('/profile/' + post.user._id)} className=" inline-flex items-center cursor-pointer gap-3 ">
        <img
          src={post.user.profile_picture}
          alt="profile pic"
          className="h-10 w-10 shadow rounded-full"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span> {post.user.full_name} </span>
            <BadgeCheck className="w-4 h-4 text-blue-500 " />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
          <span></span>
        </div>
      </div>
      {/* Post Content */}
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postwithHashtags }}
        />
      )}

      {/* images */}

      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((img, index) => (
          <img
            src={img}
            key={index}
            className={`rounded-lg h-48 object-cover w-full ${
              post.image_urls.length === 1 && "col-span-2 h-auto"
            } `}
            alt="post images"
          />
        ))}
      </div>

      {/* Actions */}

      <div className="pt-2 border-t border-gray-300 flex items-center gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-1">
                <Heart className={` w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-pink-600'}`} onClick={handleLike}/>
                <span>{likes.length}</span>
            </div>
            <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{15}</span>
            </div>
            <div className="flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                <span>{7}</span>
            </div>
      </div>

    </div>
  );
};

export default PostCards;
