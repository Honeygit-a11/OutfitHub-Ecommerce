import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
// import axios from 'axios';
import '../../../components/Admin/order/Order.css';
const Order = () => {
  const [orders,setOrders] = useState([]);

  //fetch order

  useEffect(()=>{
    fetchOrders();
  },[]);

  const fetchOrders = async ()=>{
    try{
      const res = await axios.get('http://localhost:7000/api/orders');
      setOrders(res.data);
    }catch(err){
      console.error(err);
    }
  };
  //accept 
  const handleAccept = async (id) =>{
    await axios.put(`http://localhost:7000/api/orders/${id}`,{status:"Accepted"});
    fetchOrders();
  };
  //delete order
  const handleDelete = async(id) =>{
    await axios.delete(`http://localhost:7000/api/orders/${id}`);
    fetchOrders();
  };
  return (
    <>
     <div className='orders-container'>
      <h2>All Orders</h2>
      <table className='orders-table'>
        <thead>
          <tr>
            <th>Product</th>
            <th>User</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>(
           <tr key={order._id}>
            <td>{order.productName}</td>
            <td>{order.userName}</td>
            <td>{order.price}</td>
            <td>{order.status}</td>
            <td>
              <button className='accept-btn'
              onClick={()=> handleAccept(order._id)}
              disabled={order.status === 'Accepted'}>
                Accept
              </button>
              <button className='delete-btn' onClick={()=> handleDelete(order._id)}>
                Delete
              </button>
            </td>
           </tr>
          ))}
        </tbody>
      </table>
      </div> 
    </>
  )
}

export default Order
