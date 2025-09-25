import React from 'react'
// import Billing from '../Billing.jsx/Billing';
import CheckoutForm from '../CheckoutForm';
import '../CheckoutSection/CheckoutSection.css'
const CheckoutSection = () => {
  return (
    <>
      <div className='main-container'>
        <div className="section-container">
          <div className='checkout-left'>
            <CheckoutForm />
          </div>
          {/* <div className='checkout-right'>
            <Billing />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default CheckoutSection;
