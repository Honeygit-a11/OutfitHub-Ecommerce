import React, { useState } from 'react'
import upload_area from '../../Assets/upload_area.svg';
import '../../../components/Admin/Addproduct/Addproduct.css'

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'men',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    // Validate fields
    if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
      alert("Please fill all fields and select an image.");
      return;
    }

    // Upload image
    let formData = new FormData();
    formData.append('product', image);

    let responseData = await fetch('http://localhost:7000/upload', {
      method: 'POST',
      body: formData,
    }).then((resp) => resp.json());

    if (responseData.success) {
      let product = { ...productDetails, image: responseData.image_url };
      // Add product
      let addResp = await fetch('http://localhost:7000/api/products/addproduct', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json());

      if (addResp.success) {
        alert('Product Added');
        // Reset form
        setProductDetails({
          name: '',
          image: '',
          category: 'men',
          new_price: '',
          old_price: '',
        });
        setImage(null);
      } else {
        alert('Failed to add product');
      }
    } else {
      alert('Image upload failed');
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name='category' className='add-product-selector'>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-thumnail-img">
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_area} alt='' className='addproduct-thumnail-img' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default Addproduct;
