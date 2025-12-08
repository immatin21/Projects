import React from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  UserRoundPen,
  MessageSquare,
  icons,
  DeleteIcon,
  CrossIcon,
  X,
  MoveRightIcon,
  Check,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchConnections } from "../features/connections/connectionsSlice";
import toast from "react-hot-toast";
import api from "../api/axios";

const Connections = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('Followers')
  const {connections,pendingConnections,followers,following} = useSelector((state)=>state.connections)
  const dataArray = [
    {label : 'Followers', value : followers, icon : Users},
    {label : 'Following', value : following, icon : UserCheck},
    {label : 'Pending', value : pendingConnections, icon : UserRoundPen},
    {label : 'Connections', value : connections, icon : UserPlus},
  ]

  const {getToken} = useAuth()
  const dispatch = useDispatch()


  useEffect(() => {
    getToken().then((token)=>{
      dispatch(fetchConnections(token))
    })
  }, [])

  // Handle function to Unfollow users
  const handleUnfollow = async (userId) => {
    try {
      const {data} = await api.post('/api/user/unfollow', {id : userId}, {
        headers : {Authorization : `Bearer ${await getToken()}`}
      }) 
      if(data.success){
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }else{
        toast(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  // Accept Connections
  const acceptConnections = async (userId) => {
    try {
      const {data} = await api.post('/api/user/accept', {id : userId}, {
        headers : {Authorization : `Bearer ${await getToken()}`}
      }) 
      if(data.success){
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }else{
        toast(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  // Handle Remove Connection
    const handleRemoveConnections = async (userId) => {
    try {
      const {data} = await api.post('/api/user/remove-connections', {id : userId}, {
        headers : {Authorization : `Bearer ${await getToken()}`}
      }) 
      if(data.success){
        toast.success(data.message)
        dispatch(fetchConnections(await getToken()))
      }else{
        toast(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-6xl md:mx-10 p-6">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-slate-900 text-3xl mb-2 font-bold">Connections</h1>
          <p className="text-slate-600">Manage your network and discover new connections</p>
        </div>
        
        {/* Counts */}
        <div className="mb-8 flex flex-wrap gap-6">
          {
            dataArray.map((item,index)=>(
              <div key={index} className="flex flex-col items-center justify-center gap-1 hover:scale-99 border h-20 w-40 border-gray-400 rounded-md shadow bg-white">
                <b>{item.value.length}</b>
                <p className="text-slate-600">{item.label}</p>
              </div>
            ))
          }
        </div>

        {/* tabs */}
          <div className="inline-flex flex-wrap items-center border border-gray-200 rounded-md p-1 bg-white shadow-sm">
              {
                dataArray.map((tab)=>(
                  <button key={tab.label} onClick={()=>setCurrentTab(tab.label)} className={`cursor-pointer hover:rounded-md hover:bg-gray-100 flex items-center px-3 py-1 text-sm rounded-md transition-colors ${currentTab === tab.label ? 'font-medium text-black bg-gray-200' : 'text-gray-500 hover:text-black'}`}>
                    <tab.icon className="w-4 h-4"/>
                    <span className="ml-1">{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{tab.count}</span>
                    )}
                  </button>
                ))
              }
          </div>

          {/* Connections */}
          <div className="flex flex-wrap gap-6 mt-6">
            {
              dataArray.find((item)=>item.label === currentTab).value.map((user)=>(
                <div key={user._id} className="max-w-96 w-full flex gap-6 p-6 bg-white rounded-md shadow">
                  <img src={user.profile_picture} className="rounded-full w-12 h-12 shadow-md mx-auto" alt="profile picture" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-700">{user.full_name}</p>
                    <p className="text-slate-500">@{user.username}</p>
                    <p className="text-gray-600 text-sm">{user.bio.split(0,10)}...</p>
                  <div className="flex max-sm:flex-col gap-2 mt-4">
                    {
                      <button onClick={()=>navigate(`/profile/${user._id}`)} className="w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer">
                        View Profile
                      </button>
                    }

                    {
                      currentTab === "Following" && (
                        <button onClick={()=>handleUnfollow(user._id)} className="w-full text-sm rounded p-2 bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer">
                          Unfollow
                        </button>
                      )
                    }
                    {
                      currentTab === "Pending" && (
                        <button onClick={()=>acceptConnections(user._id)} className="w-full text-sm rounded p-2 bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer flex justify-center items-center gap-2">
                          <Check className="w-5 h-5 text-green-700 "/>
                          <span>Accept</span>
                        </button>
                      )
                    }
                    {
                      currentTab === "Connections" && (
                        <button onClick={()=>navigate(`/messages/${user._id}`)} className="w-full text-sm rounded p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer flex items-center justify-center gap-1">
                          <MessageSquare className="w-4 h-4"/>
                          Message
                        </button>
                        
                      )
                    }
                    {
                      currentTab === "Connections" && (
                        <button onClick={()=>handleRemoveConnections(user._id)} className="w-full text-sm rounded p-2 bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer flex justify-center items-center">
                          <X className="w-5 h-5 text-red-700"/>
                          <span>Remove</span> 
                        </button>
                        
                      )
                    }

                  </div>
                  </div>
                </div>
              ))
            }
          </div>
    </div>
  </div>  
  );
};

export default Connections;
