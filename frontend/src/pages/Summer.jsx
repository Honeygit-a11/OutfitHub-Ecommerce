import React, { useContext } from 'react'
import summer from '../components/Assets/summer';
import '../Style/Summer.css';
import { ShopContext } from '../context/ShopContext';
const Summer = () => {
  const { addTocart }  = useContext(ShopContext);
  return (
    <>
    <div className='summer-colletion'>
      <h2 style={{textAlign:'center',}}>Summer Collection</h2>
      <div className='summer-grid'>
        {summer.map((item, index) =>(
          <div className='summer-card' key={index}>
            <img src={item.image} alt={item.name}/>
            <h4>{item.name}</h4>
            <p>
              <b>${item.new_price}</b>{''}
              <span style={{textDecoration:"line-through",color:"gray"}}>
                ${item.old_price}
              </span>
            </p>
            <button className="btn add-cart" onClick={()=> addTocart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
      
    </>
  )
}

export default Summer;
