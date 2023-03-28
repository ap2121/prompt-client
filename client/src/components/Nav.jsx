import React from 'react'
import { NavLink } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
      <NavLink to={'/feed'}>Feed</NavLink>
      <NavLink to={'/profile'}>Profile</NavLink>
      <NavLink to={'/about'}>About</NavLink>
      <NavLink to={'/login'}>Login</NavLink>
      <NavLink to={'/register'}>Register</NavLink>
    </div>
  )
}

export default Nav