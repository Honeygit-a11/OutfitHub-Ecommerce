import React, { useContext, useState } from "react";
import "../payment/payment.css";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentMethod = () => {
  const [method, setMethod] = useState("card");
  const [verified, setVerified] = useState(false);
  const { getFinalAmount, deliveryCharge, discount,getCartProductDetails} = useContext(ShopContext);
  const navigate = useNavigate();

  // validation handlers
  const validateCard = () => {
    const cardNumber = document.querySelector("input[placeholder='Card Number']").value;
    const cvv = document.querySelector("input[placeholder='CVV']").value;
    if (!/^\d{16}$/.test(cardNumber)) {
      toast.warn("Card number must be 16 digits");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      toast.error("CVV must be 3 digits");
      return;
    }
    toast.success("Card details verified successfully!");
    setVerified(true);
  };

  const validateUPI = () => {
    const upi = document.querySelector(".upi").value;
    if (!/^[a-zA-Z0-9.\-_]{2,}@[a-z]{3,}$/.test(upi)) {
      toast.error("Enter a valid UPI ID (e.g., username@okaxis)");
      return;
    }
    toast.success("UPI verified successfully!");
    setVerified(true);
  };

  const validateGooglePay = () => {
    const ref = document.querySelector(".gpay-ref")?.value;
    if (!/^\d{16}$/.test(ref)) {
      toast.warn("Reference ID must be exactly 16 digits");
      return;
    }
    toast.success("Google Pay reference verified!");
    setVerified(true);
  };

  const validateNetBanking = () => {
    const accNo = document.querySelector(".net-acc")?.value;
    const ifsc = document.querySelector(".net-ifsc")?.value;
    if (!/^\d{9,18}$/.test(accNo)) {
      toast.warn("Account number must be between 9 and 18 digits");
      return;
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
      toast.error("Enter a valid IFSC code (e.g., SBIN0001234)");
      return;
    }
    toast.success(" Net Banking details verified!");
    setVerified(true);
  };

  const handleCompletePayment = async () => {
    debugger
    if(verified){
      try{
        const orderItems = getCartProductDetails();

        const orderData ={
          ProductName:orderItems,
          userName:localStorage.getItem('userName' )|| 'Guest',
          price:getFinalAmount()+deliveryCharge,
          status:"Pending"
        };
        await axios.post('http://localhost:7000/api/orders',orderData);

      toast.success("Product ordered successful");

      document.querySelectorAll('input').forEach((input) => (input.value = ''));
      document.querySelectorAll('select').forEach((select) => (select.value = 'select'));

      setVerified(false);
      setMethod('card');

      navigate('/');
    }catch (err) {
      console.error(err);
      toast.error("Something went wrong while placing order");
    }
  }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Method</h2>
      <p className="payment-subtitle">
        Choose your preferred payment method to complete your purchase
      </p>

      <div className="payment-content">
        <div className="payment-options">
          <label className={`option ${method === "card" ? "active" : ""}`}>
            <input
              type="radio"
              name="method"
              value="card"
              checked={method === "card"}
              onChange={() => {
                setMethod("card");
                setVerified(false);
              }}
            />
            Credit/Debit Card
          </label>

          <label className={`option ${method === "netbanking" ? "active" : ""}`}>
            <input
              type="radio"
              name="method"
              value="netbanking"
              checked={method === "netbanking"}
              onChange={() => {
                setMethod("netbanking");
                setVerified(false);
              }}
            />
            Net Banking
          </label>

          <label className={`option ${method === "UPI" ? "active" : ""}`}>
            <input
              type="radio"
              name="method"
              value="UPI"
              checked={method === "UPI"}
              onChange={() => {
                setMethod("UPI");
                setVerified(false);
              }}
            />
            UPI
          </label>

          <label className={`option ${method === "google" ? "active" : ""}`}>
            <input
              type="radio"
              name="method"
              value="google"
              checked={method === "google"}
              onChange={() => {
                setMethod("google");
                setVerified(false);
              }}
            />
            Google Pay
          </label>

          <label className={`${method === "cash on delivery" ? "active" : ""}`}>
            <input
              type="radio"
              name="method"
              value="Cash on Delivery"
              checked={method === "Cash on Delivery"}
              onChange={() => {
                setMethod("Cash on Delivery");
                setVerified(true);
              }}
            />
            Cash on Delivery
          </label>

        </div>

        <div className="payment-details">
          {method === "card" && (
            <>
              <input type="text" placeholder="Card Number" />
              <div className="row">
                <input type="text" placeholder="Expiry Date (MM/YY)" />
                <input type="text" placeholder="CVV" />
              </div>
              <input type="text" placeholder="Cardholder Name" />
              <button type="button" onClick={validateCard}>
                Verify Card
              </button>
            </>
          )}

          {method === "netbanking" && (
            <div>
              <h4>Select Net Banking</h4>
              <select className="option">
                <option value="select">--select--</option>
                <option value="sbi">SBI Net Banking</option>
                <option value="hdfc">HDFC Net Banking</option>
                <option value="icici">ICICI Net Banking</option>
                <option value="axis">Axis Bank Net Banking</option>
                <option value="kotak">Kotak Mahindra Net Banking</option>
              </select>
              <input type="text" placeholder="Account Number" className="net-acc" />
              <input type="text" placeholder="IFSC Code" className="net-ifsc" />
              <button type="button" onClick={validateNetBanking}>
                Verify Net Banking
              </button>
            </div>
          )}

          {method === "UPI" && (
            <div className="Upi">
              <p>
                ENTER UPI ID .
                <input type="text" placeholder="example@okaxis" className="upi" />
              </p>
              <button type="button" onClick={validateUPI}>
                Verify UPI
              </button>
            </div>
          )}

          {method === "google" && (
            <div>
              <p>Scan QR with Google Pay to complete the Payment.</p>
              <img src="GPAY.png" alt="QR Code" />
              <input type="text" placeholder="Reference ID (16 digits)" className="gpay-ref" />
              <button type="button" onClick={validateGooglePay}>
                Verify Google Pay
              </button>
            </div>
          )}
          {method === "Cash on Delivery" && (
            <div>
              <p>You chose <strong>Cash on Delivery</strong>. Please pay when the product is delivered.</p>
              <button type="button" onClick={() => setVerified(true)}>
                Confirm COD Order
              </button>
            </div>
          )}

        </div>
      </div>

      <div className="payment-security">
        <span>🔒 SSL Secured</span>
        <span>🔐 256-bit Encryption</span>
        <span>✔ PCI Compliant</span>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>₹{getFinalAmount()}</span>
        </div>
        <hr />
        <div className="summary-row">
          <span>Shipping</span>
          <span>₹{deliveryCharge}</span>
        </div>
        <hr />
        <div className="summary-row">
          <span>Discount</span>
          <span>{discount}%</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total</span>
          <span>₹{getFinalAmount() + deliveryCharge}</span>
        </div>
      </div>

      <button

        className="payment-btn"
        disabled={!verified}
        onClick={handleCompletePayment}
      >
        Complete Payment
      </button>

      <p className="terms">
        By completing this purchase, you agree to our Terms of Service.
      </p>
    </div>
  );
};

export default PaymentMethod;
