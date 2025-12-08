import React from "react";
import { useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { fetchUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getToken} = useAuth()
  const dispatch = useDispatch()
  const handleSearch = async (query) => {
      try {
        setLoading(true)

        const {data} = await api.post('/api/user/discover',{input : query} ,{
          headers : {Authorization : `Bearer ${await getToken()}`}
        })
        
        data.success ? setUsers(data.users) : toast.error(data.message)
        
      } catch (error) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    
  };

  useEffect(() => {
    getToken().then((token)=>{
      dispatch(fetchUser(token))
    })
  }, [])

  useEffect(() => {
    
    const delay = setTimeout(() => {
      if(input.trim()){
        handleSearch(input)
      }else{
        setUsers([])
      }
    }, 300);
  
    return () => {
      clearTimeout(delay)
    }
  }, [input])
  
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl md:mx-10 p-6">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-slate-900 text-3xl mb-2 font-bold">
            Discover People
          </h1>
          <p className="text-slate-600">
            Connect with amazing people and gorow your network
          </p>
        </div>

        {/* Search */}
        <div className="rounded-md shadow-md border border-slate-200/60 mb-8 bg-white/80">
          <div className="p-6">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search people by name, username, bio, or location..."
                className="pl-10 sm:pl-12 w-full py-2 border border-gray-300 rounded-md max-sm:text-sm"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
                // onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* user card */}

        <div className="flex flex-wrap gap-6">
          {users.map((user)=>(
            <UserCard user={user} key={user._id}/>
          ))}
        </div>

          {
            loading && <Loading height="60vh"/>
          }

      </div>
    </div>
  );
};

export default Discover;
