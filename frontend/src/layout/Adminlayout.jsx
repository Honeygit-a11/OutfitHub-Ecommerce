import React from 'react'
import { Outlet } from 'react-router-dom'
import Slidebar from '../components/Admin/Slidebar/Slidebar'
import Navbar from '../components/Admin/Navbar/Navbar'

const Adminlayout = () => {
  return (
    <>
      <div  style={{width: '100%'}}>
        <Navbar />
        <div style={{width: '100%', display: 'flex', flexDirection:"row" ,marginTop:"20px"}}>
          <Slidebar />
          <main className='admin'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default Adminlayout;
