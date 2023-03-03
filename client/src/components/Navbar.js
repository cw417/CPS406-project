import React from 'react'
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className='nav'>
        <NavLink className='nav-link' to='/'>
          <div>Home</div>
        </NavLink>
        <NavLink className='nav-link' to='/create'>
          <div>Create Account</div>
        </NavLink>
      </nav>
    </div>
  )
}
