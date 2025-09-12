import React from 'react'
import '../../pages/Admin/Admin.css'
import { Route, Routes } from 'react-router-dom';
import Addproduct from "../../components/Admin/Addproduct/Addproduct";
import Listproduct from "../../components/Admin/Listproduct/Listproduct";
import Adminlayout from '../../layout/Adminlayout';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import Order from '../../components/Admin/order/Order';

const Admin = () => {
  return (
    <div className='admin'>

      <Routes>
        <Route path='/' element={<Adminlayout />}>
          <Route index element={<Dashboard/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/listproduct' element={<Listproduct />} />
          <Route path='/order' element={<Order/>}/>
        </Route>

      </Routes>
    </div>
  )
}

export default Admin;