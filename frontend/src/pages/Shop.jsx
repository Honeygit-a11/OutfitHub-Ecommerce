import React, { useEffect } from 'react'
import '../Style/Shop.css'
import images from '../assets/images';
import Products from '../assets/Product';
import { FaTruckMoving } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
const Shop = () => {
 const navigate = useNavigate();

  const CategoryCard = ({ image, title,description,path }) => (
    <div className='category-card'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button className='btn secondary' onClick={()=> navigate(path)}>Shop Now</button>
    </div>  );
  const ProductCard = ({ image, title, price, rating }) => (
    <div className='product-card'>
      <img src={image} alt={title}/>
      <h4>{title}</h4>
      <div className='price-star'>
      <span className='price'>{price}</span>
      <span className='stars'>{"⭐".repeat(rating)}</span>
      </div>
      <button className='btn add-cart'>Add to Cart</button>
    </div>
  )
  return (
    <>
      <section className='hero'>
        <h1>Summer Collection 2025</h1>
        <p>
         <pre> Discover the latest "Trends styles" </pre>  <pre> For the season. Quality fashion for everyone.</pre>
       
        </p>
        <div className='buttons'>
          <button className='btn primary' onClick={()=> navigate('/summer')}>Shop Now</button>
          <button className='btn secondary' onClick={()=> navigate('/viewproduct')}>View Collection</button>
        </div>
      </section>

      {/* shop by category */}

      <section className='categories'>
        <h2>Shop By Category</h2>
        <div className="category-grid">
          {images.map((img, index) => (
            <CategoryCard
              key={index}
              image={img.src}
              alt={img.alt}
              title={img.title}
              description={img.description}
              path={img.path}
            />
          ))}
        </div>
      </section>

      {/* featured product */}
      <section className='featured'>
        <h2>Featured Products</h2>
        <div className='product-grid'>
          {Products.map((Product, index) => (
            <ProductCard
              key={index}
              image={Product.src}
              title={Product.title}
              price={Product.price}
              rating={Product.rating}
            />
          ))}
        </div>
        <button className='btn primary' onClick={()=> navigate('/viewproduct')}>View All Products</button>
      </section>
      {/* promotions */}
       <div className='card-container'>
        <div className='custom-card'>
          <div className='card-text'>
            <h3>Summer Collection</h3>
            <p>Get up to 50% off on all summer essentials</p>
            <button className='card-btn' onClick={()=> navigate('/summer')}> Shop Now </button>
          </div>
          <div className='card-image'>
            <img src='summer collection.jpg' alt='Summer Collection'/>
          </div>
        </div>

        <div className='custom-card'>
          <div className='card-text'>
            <h3>New Arrivals</h3>
            <p>Check out our latest fashion arrivals</p>
            <button className='card-btn'>Discover</button>
          </div>
          <div className='card-image'>
            <img src='arival.jpg' alt='New Arrivals'/>
          </div>
        </div>
       </div>

      <section className='newsletter-section'>
        <h2>Subscribe to Our NewsLetter</h2>
        <p>updated with our latest products, exclusive offers, and fashion tips.</p>
        <div className='newsletter-form'>
          <input type='email' placeholder='Your email address'/>
          <button className='btn subscribeButton'>Subscribe</button>
        </div>
      </section>
      {/* features */}
<section className="features-section">
  <div className="feature-card">
    <span className="icon"><FaTruckMoving /></span>
    <h3>Free Shipping</h3>
    <p>Free shipping on orders over $50</p>
  </div>
  <div className="feature-card">
    <span className="icon"><FaUndoAlt /></span>
    <h3>Easy Returns</h3>
    <p>30-day return policy</p>
  </div>
  <div className="feature-card">
    <span className="icon"><FaLock /></span>
    <h3>Secure Payment</h3>
    <p>100% secure payment</p>
  </div>
  <div className="feature-card">
    <span className="icon"><IoCall /></span>
    <h3>24/7 Support</h3>
    <p>Dedicated customer service</p>
  </div>
</section>

{/* <footer class="footer">
  <div class="footer-container">
    <div class="footer-column brand-column">
      <h3>StyleShop</h3>
      <p>Your one-stop destination for quality fashion and accessories.</p>
      <div class="social-icons">
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-pinterest-p"></i></a>
      </div>
    </div>

   
   <div class="footer-column link-group">
      <div class="link-section">
        <h4>Shop</h4>
        <ul>
          <li><a href="#">Men</a></li>
          <li><a href="#">Women</a></li>
          <li><a href="#">Kids</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">New Arrivals</a></li>
        </ul>
      </div>
      <div class="link-section">
        <h4>Help</h4>
        <ul>
          <li><a href="#">Customer Service</a></li>
          <li><a href="#">My Account</a></li>
          <li><a href="#">Find a Store</a></li>
          <li><a href="#">Legal & Privacy</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
    </div> 

   <div class="footer-column contact-column">
      <h4>Contact</h4>
      <ul>
        <li>📍 123 Fashion Street, City, Country</li>
        <li>📞 +1 234 567 890</li>
        <li>✉️ info@styleshop.com</li>
      </ul>
    </div>

  </div>
  
  <div class="footer-bottom">
    <p>© 2023 StyleShop. All rights reserved.</p>
    <div class="footer-links">
      <a href="#">Terms of Service</a>
      <a href="#">Privacy Policy</a>
    </div>
  </div>
</footer>  */}

    </>
  )
}
export default Shop;
