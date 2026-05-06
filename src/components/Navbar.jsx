import React from 'react'

const Navbar = () => {
  return (
    <div className = "w-full  bg-slate-500 h-16 px-14  flex items-center justify-between">
      <h1 className ="text-white text-3xl font-bold " > Em Service</h1>
      <div className = "space-x-4 ml-auto">
      <a  className="hover:text-blue-400"  href ="/">Home</a>
      <a className="hover:text-blue-400"  href = "/">Profile</a>
      <a  className="hover:text-blue-400"  href = "/">Logout</a>
      </div>
    </div>

  )
}

export default Navbar