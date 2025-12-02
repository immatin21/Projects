import React from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCards from '../components/PostCards'
import RecentMessages from '../components/RecentMessages'


const Feed = () => {

  const [Feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFeeds = async()=>{
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds();
  }, [])
  

  return !loading ? (
    <div className='flex items-start justify-center xl:gap-8 xl:pr-5 py-10 h-full overflow-y-scroll no-scrollbar'>
      {/* {Posts and Feeds} */}
      <div>
        {/* <h1>Stories Here</h1> */}
        <StoriesBar/>
        {/* {Posts Here} */}
        <div className='p-4 space-y-6'>
          {/* List of Posts Here... */}
          {
            Feeds.map((post)=>(
              <PostCards key={post._id} post={post}/>
            ))
          }         
        </div>
      </div>
      {/* {Right Sidebar} */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='font-semibold text-slate-800'>Sponsored</h3>
          <img src={assets.sponsored_img} alt="sponser" className='w-72 h-52 rounded-md' />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
        </div>
        {/* Recent Messages */}
        {<RecentMessages/>}
      </div>

    </div>
  ) : ( <Loading/> )
}

export default Feed
