import React from 'react'
import '../Style/Footer.css'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <>
    <footer className="footer">
  <div className="footer-container">
    <div className="footer-column brand-column">
      <h3>OutfitHub</h3>
      <p>Your one-stop destination for quality fashion and accessories.</p>
      <div className="social-icons">
        <a href="#"><FaFacebook /></a>
        <a href="#"><FaTwitterSquare /></a>
        <a href="#"><FaInstagramSquare /></a>
        <a href="#"><FaWhatsappSquare /></a>
      </div>
    </div>

   <div className="footer-column link-group">
      <div className="link-section">
        <h4>Shop</h4>
        <ul>
          <li><Link to="/mens">Men</Link></li>
          <li><Link to="/womens">Women</Link></li>
          <li><Link to="kids">Kids</Link></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">New Arrivals</a></li>
        </ul>
      </div>
      <div className="link-section">
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

   <div className="footer-column contact-column">
      <h4>Contact</h4>
      <ul>
        <li>📍 123 Fashion Street, City, Country</li>
        <li>📞 +1 234 567 890</li>
        <li>✉️ info@styleshop.com</li>
      </ul>
    </div>

  </div>
  
  <div className="footer-bottom">
    <p>© 2025 OutfitHub. All rights reserved.</p>
    <div className="footer-links">
      <a href="#">Terms of Service</a>
      <a href="#">Privacy Policy</a>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer
