import React, { useContext } from 'react'
import './Billing.css'
import { ShopContext } from '../../context/ShopContext'
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const {getTotalCartAmount,discount, getFinalAmount} = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout =()=>{
    navigate('/checkout');
  }
  return (
    <>
    <div className='cartitem-1'>
      <div className="cartitems-total">
            <h1 style={{color:"grey"}}>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
              <p>Discount Applied</p>
              <p>{discount}%</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>₹{getFinalAmount()}</h3>
              </div>
            </div>
            <button onClick={() =>handleCheckout()}>PROCEED TO CHECKOUT</button>
          </div>
    </div>
      
    </>
  )
}

export default Billing;