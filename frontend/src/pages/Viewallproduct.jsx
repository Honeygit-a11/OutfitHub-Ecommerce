import React from "react";
import new_collections from "../components/Assets/new_collections"; // adjust path if needed
import "../Style/Shop.css";

const Viewallproduct = () => {
  return (
    <section className="all-products">
      <h2>All Products</h2>
      <div className="product-grid">
        {new_collections.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <div className="price-star">
              <span className="price">₹{product.new_price}</span>
              <span className="old-price">₹{product.old_price}</span>
            </div>
            <button className="btn add-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Viewallproduct;
