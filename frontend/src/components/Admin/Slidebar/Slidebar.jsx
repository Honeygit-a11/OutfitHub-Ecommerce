import React from 'react'
import '../../../components/Admin/Slidebar/Slidebar.css'
import { Link } from 'react-router-dom';
import productCartIcon from '../../Assets/Product_Cart.svg';
import productListIcon from '../../Assets/Product_list_icon.svg';
import dashboard from '../../../components/Assets/dashboard.svg.png'
import products from '../../../components/Assets/products.png'

const Slidebar = () => {
  return (
    <>
    <div className="sidebar">
      <Link to='/admin/dashboard' style={{textDecoration:'none'}}>
      <div className="sidebar-item">
        <img src={dashboard} alt="Dashboard" className='svgpng' />
        <p>Dashboard</p>
      </div>
      </Link>
      <Link to='/admin/addproduct' style={{textDecoration:'none'}}>
      <div className="sidebar-item">
        <img src={productCartIcon} alt="Add Product" />
        <p>Add Product</p>
      </div>
      </Link>
      <Link to='/admin/listproduct' style={{textDecoration:'none'}}>
      <div className="sidebar-item">
        <img src={productListIcon} alt="Product List" />
        <p>Product List</p>
      </div>
      </Link>
      
 <Link to='/admin/order' style={{textDecoration:'none'}}>
      <div className="sidebar-item">
        <img src={products}alt=""  style={{width:'29px', height:'29px'}}/>
        <p>Product Details</p>
      </div>
      </Link>
    </div>
      
      
    </>
  )
}

export default Slidebar;
