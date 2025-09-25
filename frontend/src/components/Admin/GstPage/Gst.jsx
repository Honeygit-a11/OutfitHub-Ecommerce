import React, { useEffect, useState } from "react";
import "./Gst.css"; // Import CSS file

const Gst = () => {
  const [gst, setGst] = useState("");
  const [savedGst, setSavedGst] = useState(null);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [savedCoupon, setSavedCoupon] = useState(null);

  useEffect(() => {
    // fetch current GST from backend
    fetch("http://localhost:7000/api/settings/gst")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.gst !== undefined) setSavedGst(data.gst);
      })
      .catch((err) => console.error("Failed to fetch gst", err));
  }, []);

  // Save GST (admin)
  const handleSaveGst = async () => {
    if (gst === "" || isNaN(gst)) {
      alert("Please enter a valid GST percentage");
      return;
    }
    try {
      const res = await fetch("http://localhost:7000/api/settings/gst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ gst: Number(gst) }),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedGst(data.gst);
        alert("GST saved");
      } else {
        alert(data.message || "Failed to save GST");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save GST");
    }
  };

  // Save Coupon (admin)
  const handleSaveCoupon = async () => {
    if (couponCode.trim() === "" || discount === "" || isNaN(discount)) {
      alert("Please enter a valid coupon code and discount");
      return;
    }
    try {
      const res = await fetch("http://localhost:7000/api/settings/coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ code: couponCode.trim(), discount: Number(discount) }),
      });
      const data = await res.json();
      if (res.ok) {
        setSavedCoupon(data.coupon);
        alert("Coupon created");
        setCouponCode("");
        setDiscount("");
      } else {
        alert(data.message || "Failed to create coupon");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create coupon");
    }
  };

  return (
    <div className="gst-container">
      {/* GST Section */}
      <h2 className="gst-title">GST Settings</h2>

      <label className="gst-label">Enter GST (%)</label>
      <input
        type="number"
        value={gst}
        onChange={(e) => setGst(e.target.value)}
        placeholder="Enter GST percentage"
        className="gst-input"
      />

      <button onClick={handleSaveGst} className="gst-button">
        Save GST
      </button>

      {savedGst !== null && (
        <p className="gst-current">Current GST: {savedGst}%</p>
      )}

      <hr className="gst-divider" />

      {/* Coupon Section */}
      <h2 className="gst-title">Discount / Coupon Settings</h2>

      <label className="gst-label">Coupon Code</label>
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter coupon code (e.g., SALE20)"
        className="gst-input"
      />

      <label className="gst-label">Discount (%)</label>
      <input
        type="number"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        placeholder="Enter discount percentage"
        className="gst-input"
      />

      <button onClick={handleSaveCoupon} className="gst-button">
        Save Coupon
      </button>

      {savedCoupon && (
        <p className="gst-current">
          Active Coupon: <b>{savedCoupon.code}</b> → {savedCoupon.discount}% Off
        </p>
      )}
    </div>
  );
};

export default Gst;
