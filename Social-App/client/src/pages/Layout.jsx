import React, {useState} from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'

const Layout = () => {
  const user = dummyUserData
  const [Sidebaropen, setSidebaropen] = useState(false)
  return user ? (
    <div className='flex w-full h-screen'>
      <Sidebar Sidebaropen={Sidebaropen} setSidebaropen={setSidebaropen} />
      <div className='flex-1 bg-slate-50'>
        <Outlet/>
      </div>
      {Sidebaropen ? 
      <X className='sm:hidden absolute top-3 right-3 p-2 bg-white rounded-md shadow w-10 h-10 text-gray-600 cursor-pointer' onClick={()=>setSidebaropen(false)}/>
      : 
      <Menu className='sm:hidden absolute top-3 right-3 p-2 bg-white rounded-md shadow w-10 h-10 text-gray-600 cursor-pointer' onClick={()=>setSidebaropen(true)}/>    
      }
    </div>
  ) : (
  <Loading/>
  )
}

export default Layout
