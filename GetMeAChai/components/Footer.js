import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-90 text-white flex justify-center items-center h-14 p-4'>
      <p className='text-center'>Copyright &copy; {currentYear} Get Me A Chai! - All Rights Reserved!</p>
    </footer>
  )
}

export default Footer
