import React, { useContext, useState } from 'react'
import '../Style/CheckoutForm.css'
import { ShopContext } from '../context/ShopContext';
import { Navigate, useNavigate } from 'react-router-dom';

const CheckoutForm = ({ onSubmit }) => {
  const [address, setAddress] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId,setEditingId]=useState(null);
  const { getFinalAmount , setDeliveryCharge,deliveryCharge} = useContext(ShopContext);
  const [selectedDelivery, setSelectedDelivery] = useState('free')
  const [formData, setFromData] = useState({
    name: '',
    email: "",
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
const navigate = useNavigate();
  
  //PAGINATION
  // const [currentPage,setCurrentPage] = useState(1);
  // const addressPerPage = 1;

  //
  // const start = (currentPage -1)* addressPerPage;
  // const currentAddress = address.slice(start + addressPerPage);
  // const totalPages = Math.ceil(1,Math.ceil(address.length /addressPerPage ));

    const handleDeliveryChange = (method,charge) => {
    setSelectedDelivery(method);
    setDeliveryCharge(charge);
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  };

  const handleAddAddress = () => {

    if(editingId){
      setAddress(address.map((addr)=>(addr.id === editingId ? {...formData,id:editingId}: addr)));
    }else{
    setAddress([...address, { id: Date.now(), ...formData }]);
    }
    setFromData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
    setEditingId(null);
    setShowForm(false);
  }
  const handleEdit=(addr)=>{
    setFromData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  }
  const handlepayment = () =>{
    navigate('/payment');
  }
  return (
    <>
      <div className="shipping-container">

        <h2 className="shipping-heading">Delivery Address</h2>
        <div
          className="add-address"
          onClick={() => {setShowForm(true)
            setEditingId(null);
          }
  }
        >
          <span>+ ADD ADDRESS</span>
        </div>

        <div className='delivery-method-section'>
          <h3>Choose Delivery Method</h3>
          <div className='delivery-options'>
            <label>
              <input type='radio'
              name='delivery'
              checked={selectedDelivery === 'free'}
              onChange={()=> handleDeliveryChange('free',0)}/>
              Free Delivery (5-10 day) (₹0)
            </label>
            
              <label>
              <input type='radio'
              name='delivery'
              checked={selectedDelivery === 'express'}
              onChange={()=> handleDeliveryChange('express',50)}/>
              Express Delivery (1-2 Day) (₹50)
            </label> 
            
             <label>
              <input type='radio'
              name='delivery'
              checked={selectedDelivery === 'sameDay'}
              onChange={()=> handleDeliveryChange('sameDay',100)}/>
              Same-Day Delivery (On Same Day) (₹100)
            </label>
          </div>
        </div>


        {showForm && (
          <div className="address-form">
            <input type='text'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
              required />

            <input
              type='email'
              name='email'
              placeholder='Email address'
              value={formData.email}
              onChange={handleChange}
              required />

            <input
              type='tel'
              name='phone'
              placeholder='Phone Number'
              value={formData.phone}
              onChange={handleChange}
              required />

            <textarea
              name='address'
              placeholder='Full Adresss'
              value={formData.address}
              onChange={handleChange}
              required />
            <input
              type='text'
              name='city'
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              required />
            <input
              type='text'
              name='state'
              placeholder='State'
              value={formData.state}
              onChange={handleChange}
              required />
            <input
              type='number'
              name='pincode'
              placeholder='Pincode'
              value={formData.pincode}
              onChange={handleChange}
              required />

            <button onClick={handleAddAddress}>{editingId ? 'Update Address' : "save address"}</button>
          </div>
        )}

        <div className="saved-addresses">
          {address.map((addr) => (
            <div key={addr.id} className="address-card">
              <p style={{fontWeight:600,fontSize:30,}}>Delivery address</p>
              <h3>{addr.name}</h3>
              <p><strong>Email:</strong> {addr.email}</p>
              <p><strong>Phone:</strong> {addr.phone}</p>
              <p><strong>Address:</strong> {addr.address}</p>
              <p>
                <strong>City:</strong> {addr.city}, <strong>State:</strong> {addr.state}, <strong>Pincode:</strong> {addr.pincode}
              </p>
              <div className="address-actions">
              <button className="deliver-btn" onClick={()=> handleEdit(addr)}>Change</button>
              </div>
          <div className="payment-info">
          <h3>Total Cost : ₹{getFinalAmount() + deliveryCharge}</h3>
          <button className='payment-btn'onClick={handlepayment}>Proceed to payment</button>
          </div>
            </div>
          ))}
        </div>
        {/* {address.length > addressPerPage && (
          <div className='pagination'>
            <button disabled={currentPage === 1}
            onClick={()=> setCurrentPage((p) => Math.max(1,p-1))}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
            disabled = {currentPage === totalPages}
            onClick={()=> setCurrentPage((p)=> Math.min(totalPages,p+1))}>
              Next
            </button>
          </div>
        )} */}
        
        
      </div>


    </>
  )
};

export default CheckoutForm;