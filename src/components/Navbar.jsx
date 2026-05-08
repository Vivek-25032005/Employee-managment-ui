import React from 'react'

const Navbar = () => {
  return (
    <div className = "w-full bg-slate-500 h-16 px-4 sm:px-14 flex items-center justify-between">
      <h1 className ="text-white text-xl sm:text-3xl font-bold " > Em Service</h1>
      <div className = "space-x-2 sm:space-x-4 ml-auto flex">
      <a  className="hover:text-blue-400 text-sm sm:text-base"  href ="/">Home</a>
      <a className="hover:text-blue-400 text-sm sm:text-base"  href = "/">Profile</a>
      <a  className="hover:text-blue-400 text-sm sm:text-base"  href = "/">Logout</a>
      </div>
    </div>

  )
}

export default Navbar