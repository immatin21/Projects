import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-cyan-700 justify-around text-white flex p-2 items-center'>
        <div className="logo">
            <span className='font-bold text-2xl mx-5 md:mx-10'>iTask</span>
        </div>
      <ul className="flex gap-5 mx-5 md:mx-10 text-lg ">
        <li className='hover:font-bold transition-all duration-100'><a href="http://">Home</a></li>
        <li className='hover:font-bold transition-all duration-100'><a href="http://">Your Tasks</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
