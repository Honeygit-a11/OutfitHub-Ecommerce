import React from 'react'
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from '../src/pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import men_banner from './components/Assets/banner_mens.png'
import women_banner from './components/Assets/banner_women.png'
import kid_banner from './components/Assets/banner_kids.png'
import Mainlayout from './layout/Mainlayout';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import Viewallproduct from './pages/Viewallproduct';
import Summer from './pages/Summer';
import PaymentMethod from './components/payment/PaymentMethod';
import Adminlayout from './layout/Adminlayout';
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './context/Authcontext';
import Addproduct from './components/Admin/Addproduct/Addproduct';
import Listproduct from './components/Admin/Listproduct/Listproduct';
import Admin from './pages/Admin/Admin';
// import Dashboard from './components/Admin/Dashboard/Dashboard';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Mainlayout />}>
              <Route index element={<Shop />} />
              <Route path='/viewproduct' element={<Viewallproduct />} />
              <Route path='/summer' element={<Summer />} />

              <Route path='/mens' element={<ShopCategory banner={men_banner} category='men' />} />
              <Route path='/womens' element={<ShopCategory banner={women_banner} category='women' />} />
              <Route path='/kids' element={<ShopCategory banner={kid_banner} category='kids' />} />
              <Route path='product' element={<Product />}>
                <Route path=':productId' element={<Product />} />
              </Route>
              <Route path='/Login' element={<LoginSignup />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/payment' element={<PaymentMethod />} />
            </Route>

            <Route path='/admin/*' element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }/>
             
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App;