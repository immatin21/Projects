import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-900 opacity-70 py-2 fixed bottom-0 w-full'>
      <div className='flex items-center justify-center gap-10'>
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
              Pass
          <span className="text-green-500">OP&gt;</span>
          </div>
          <span className='text-white'>Created by <b className='text-green-500'>Matin Mondal</b></span>
      </div>
    </footer>
  )
}

export default Footer
