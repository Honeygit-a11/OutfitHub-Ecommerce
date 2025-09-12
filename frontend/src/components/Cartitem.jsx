
import React, { useContext, useState } from 'react'
import '../Style/Cartitem.css';
import remove_icon from '../components/Assets/cart_cross_icon.png'
import { ShopContext } from '../context/ShopContext';
import Billing from '../components/Billing/Billing';
const CartItems = () => {
  const { all_product, cartItems, removeFromCart,applyCoupon,discount } = useContext(ShopContext);

  const [couponCode, setCouponCode] =useState('');
  const [message,setMessage] = useState('');

  const handleApplyCoupon =()=>{
    const success  = applyCoupon(couponCode);
    if(success){
      setMessage(`Coupon Applied!`)
    }else{
      setMessage(`Invalid coupon code`);
    }
  };
  return (
    <>
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {
 
          if (cartItems[e.id] > 0) {
            return (
              <div key ={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt="" className="carticon-product-icon" />
                  <p>{e.name}</p>
                  <p>₹{e.new_price}</p>
                  <button className="cartitems-quantity">{cartItems[e.id]}</button>
                  <p>₹{e.new_price * cartItems[e.id]}</p>
                  <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} />
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}

        <div className='cartitems-down'>
          <Billing/>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='promo code' value={couponCode} onChange={(e)=> setCouponCode(e.target.value)} />
              <button onClick={handleApplyCoupon}>Submit</button>
            </div>
            {message && <p style={{color:discount ? 'green':'red'}}>{message}</p>}
          </div> 
        </div>
      </div>
    </>
  )
}

export default CartItems;
