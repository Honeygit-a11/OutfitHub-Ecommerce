import React, { useContext, useState } from 'react'
import '../Style/Navbar.css'
import { Link } from 'react-router-dom'
import cart_icon from '../components/Assets/cart_icon.png'
import { ShopContext } from '../context/ShopContext'
import logo from '../components/Assets/logo.png'
// import { FaHome } from "react-icons/fa";
 const Navbar = () => {
  const [menu,setMenu] = useState('shop');
  const {getTotalCartItems} = useContext(ShopContext);
  return (
    <>
    <div>
    <div className='top-bar'>
      Summer Sale: Up to 50% off | Free Shipping on orders over $50 |{" "}
      <Link to="/mens">Shop now</Link>
    </div>

    <header className='navbar'>
      <div className='logo'>
        <img src={logo} alt='StyleShop Logo' className='logoe'/>
      </div>
    <ul className='nav-menu'>
      <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration:'none', color:"black"}} to='/'>Shop</Link> {menu === 'shop'? <hr/>:<></>}</li>
      <li onClick={()=>{setMenu('mens')}}><Link style={{textDecoration:'none',color:'black'}} to='/mens'>Mens</Link>{menu === 'mens'? <hr/>:<></>}</li>
      <li onClick={()=>{setMenu('womens')}}><Link style={{textDecoration:'none',color:'black'}} to='/womens'>Womens</Link>{menu === 'womens'? <hr/>:<></>}</li>
      <li onClick={()=>{setMenu('kids')}}><Link style={{textDecoration:'none',color:'black'}} to ='/kids'>Kids</Link> {menu === 'kids'? <hr/>:<></>}</li>
      {/* <li ><Link style={{textDecoration:'none',color:'black'}} to ='/admin'>AdminPanel</Link> </li> */}
    </ul>
     <div className='icons'>
      {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-user');localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :<Link to ='/login'><button>Login</button></Link>}
      
      <div className='cart'>
      <Link to='/cart'> <img src={cart_icon} alt='cart'/></Link>
        <span className='cart-count'>{getTotalCartItems()}</span>
      </div>
     </div>
    </header>
    </div>
    </>
  )
}
export default Navbar;
