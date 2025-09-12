import React from 'react'
import '../../../components/Admin/Navbar/Navbar.css'
import nav_logo from '../../Assets/nav-logo.svg'
import nav_profile from '../../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='nav'>
      <img src={nav_logo} alt='StyleShop Logo' className='nav-logo'/>
        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-user');localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :<Link to ='/login'><button>Login</button></Link>}
      <img src= {nav_profile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar;
