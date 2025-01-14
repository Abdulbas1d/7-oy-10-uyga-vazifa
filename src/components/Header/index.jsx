import React from 'react'
import './index.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='container-logo'>
      <div className="logo">
        <h2>LOGO</h2>

        <div className="data">
          <NavLink className="link" to='/'>Pagination</NavLink>
          <NavLink className="link" to='/scrollPagination'>Scroll Pagination</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header
