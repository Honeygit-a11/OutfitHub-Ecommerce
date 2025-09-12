import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum';
import ProductDisplay from '../components/ProductDisplay';
import Descriptionbox from '../components/Descriptionbox';
import Relatedproduct from '../components/Relatedproduct';
import { ShopContext } from '../context/ShopContext';
// import { ShopContext } from '../context/shopcontext';

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId))

  return (
    <>
    <div>
        <Breadcrum product={product}/>
        <ProductDisplay product={product}/>
        <Descriptionbox/>
        <Relatedproduct/>
    </div>
      
    </>
  )
}

export default Product
