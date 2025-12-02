import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import { useEffect , useState } from 'react'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCards'
import moment from 'moment'
import ProfileModal from '../components/ProfileModal'

const Profile = () => {

  const {profileId} = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  },[])

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* {Profile Card} */}
        <div className='bg-white shadow rounded-2xl overflow-hidden'>
          {/* {Cover Photo} */}
          <div className='h-40 md:h-56 bggradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user.cover_photo && <img src={user.cover_photo} alt="" className='w-full h-full object-cover'/>}
          </div>

          {/* User Info */}
          {
            <UserProfileInfo user={user} profileId = {profileId} setShowEdit={setShowEdit} posts={posts} />
          }
        </div>

        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl max-w-md flex shadow p-1 mx-auto'>
            {
              ['posts','media','likes'].map((tab) => (
                <button key={tab} className={` flex-1 px-4 py-2 text-sm rounded-lg font-medium transition-colors cursor-pointer ${activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"} `} onClick={() => setActiveTab(tab)} >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))
            }
          </div>
          {/* Posts */}
          {
            activeTab === 'posts' && (
              <div className='mt-6 flex-col flex items-center gap-6'>
                {posts.map((post) => <PostCard key={post._id} post={post} />)}
              </div>
            )
          }
          {/* Media */}
          {
            activeTab === 'media' && (
              <div className='mt-6 flex flex-wrap max-w-6xl'>
                {
                  posts.filter(post => post.image_urls.length > 0).map((post) => (
                  <>
                  {
                    post.image_urls.map((img, index) => (
                      <Link target='_blank' to={img} key={index} className='relative group'>
                        <img src={img} key={index} alt="post media" className='w-64 object-cover aspect-video'/>
                        <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                      </Link>
                    ))
                  }
                  </>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
      {/* Edit Profile Modal */}
      { showEdit && <ProfileModal setShowEdit={setShowEdit} /> }
    </div>
  ) : 
  (<Loading />)
}

export default Profile
