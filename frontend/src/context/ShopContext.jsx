import { useEffect } from "react";
// import { use } from "react";
import { createContext, useState } from "react";
// import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
 for(let i=0;i<200+1; i++){
  cart[i]=0;
 }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product,setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
    fetch('http://localhost:7000/api/products/allproducts')
    .then((response) => response.json())
    .then((data)=>setAll_Products(data))

    // fetch GST from backend
    fetch('http://localhost:7000/api/settings/gst')
      .then((r) => r.json())
      .then((d) => {
        if (d && typeof d.gst === 'number') setGstRate(d.gst);
      })
      .catch(() => {});

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:7000/api/cart/getcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          "Content-Type":"application/json",
        },
        body:"",
      })
      .then((response)=>response.json())
      .then((data)=>setCartItems(data));
    }
  },[])

  const [discount, setDiscount] = useState(0);
  const [gstRate, setGstRate] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const coupons={
    HONEY07:10,
    FIRST07:20,
    DHONI07:40,
    WELCOME07:30,
    FORDER07: 5,
};
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]? prev[itemId]+1:1,
     }));
     if(localStorage.getItem('auth-token')){
       fetch('http://localhost:7000/api/cart/addtocart',{
        method:"POST",
        headers:{
          Accept:"application/json",
          'auth-token':`${localStorage.getItem('auth-token')}` ,
          "Content-Type":"application/json",
        },
        body:JSON.stringify({"itemId":itemId}),
       })
       .then((response)=>response.json())
       .then((data)=>console.log(data));
     }
  };

const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    if (prev[itemId] > 1) {
      return { ...prev, [itemId]: prev[itemId] - 1 };
    } else {
      return { ...prev, [itemId]: 0 };
    }
  });
  if(localStorage.getItem("auth-token")){
     fetch('http://localhost:7000/api/cart/removefromcart',{
      method:"POST",
      headers:{
        Accept:"application/json",
        'auth-token':`${localStorage.getItem('auth-token')}` ,
        "Content-Type":"application/json",
      },
      body:JSON.stringify({"itemId":itemId}),
     })
     .then((response)=>response.json())
     .then((data)=>console.log(data));
  }
};


  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (Product) => Product.id === Number(item)
        );
        if(itemInfo){
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    }

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
  //apply coupon
  const applyCoupon = (code) =>{
      // call backend to apply coupon (marks as used)
      return fetch('http://localhost:7000/api/settings/apply-coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token') || ''
        },
        body: JSON.stringify({ code })
      })
      .then(res => res.json().then(body => ({ status: res.status, body })))
      .then(({ status, body }) => {
        if (status === 200) {
          setDiscount(body.discount);
          return true;
        } else {
          setDiscount(0);
          return false;
        }
      })
      .catch(err => { console.error(err); setDiscount(0); return false; });
  };

  const getFinalAmount = () =>{
    let total = getTotalCartAmount();
    // apply percentage discount first
    let afterDiscount = total;
    if (discount && discount > 0) {
      if (discount <= 100) afterDiscount = total - (total * discount) / 100;
      else afterDiscount = total - discount;
    }
    // apply GST on afterDiscount
    let final = afterDiscount;
    if (gstRate && gstRate > 0) {
      final = final + (final * gstRate) / 100;
    }
    // add delivery
    final = final + deliveryCharge;
    return final;
  };
  const getCartProductDetails =()=>{
    let items= [];
    for(const itemId in cartItems) {
      if(cartItems[itemId]>0){
        let product = all_product.find(
          (p) => p.id === Number(itemId)
        );
        if(product) {
          items.push({
            productId: product.id,
            productName:product.name,
            quantity: cartItems[itemId],
            price:product.new_price,
            total: product.new_price*cartItems[itemId],
          });
        }
      }
    }
    return items;
  }

  // simple auth helper: returns true when an auth-token exists in localStorage
  const isLoggedIn = () => {
    try {
      return !!localStorage.getItem('auth-token');
    } catch (e) {
      return false;
    }
  };

  // clear cart locally and on server (if logged in)
  const clearCart = async () => {
    setCartItems(getDefaultCart());
    if (localStorage.getItem('auth-token')) {
      try {
        await fetch('http://localhost:7000/api/cart/clearcart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
          },
          body: JSON.stringify({})
        });
      } catch (err) {
        console.error('Failed to clear server cart', err);
      }
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    applyCoupon,
    discount,
    setDiscount,
    getFinalAmount,
    deliveryCharge,
    setDeliveryCharge,
    getCartProductDetails,
    gstRate,
    clearCart,
    isLoggedIn,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
