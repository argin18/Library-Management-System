import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    < >
        <aside className="w-64 min-h-screen bg-green-800 text-white p-5">
          <h2 className="text-xl font-bold text-gray-400 mb-4">MENU</h2>
          <ul className="space-y-3 text-lg">
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/" >Dashboard</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/books" >Books</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/member" >Members</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/issue" >Issue Books</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/return" >Return Books</Link></li>
            <li className="hover:text-blue-300 cursor-pointer"><Link to="/report" >Reports</Link></li>
            </ul>
        </aside>
    </>
  )
}

export default Nav