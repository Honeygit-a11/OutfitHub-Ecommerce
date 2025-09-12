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
      const coupon = coupons[code.toUpperCase()];
      if(coupon){
        setDiscount(coupon);
        return true;
      } else{
        setDiscount(0);
        return false;
      }
  };

  const getFinalAmount = () =>{
    let total = getTotalCartAmount();
    if(discount <= 100){
      return total -(total * discount)/100;
    }else{
      return total - discount + deliveryCharge;
    }
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
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
