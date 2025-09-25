const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt")

// Signup
router.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        errors: "existing user found with same email address",
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cartData: cart,
      isAdmin: req.body.isAdmin || false,
    });
    await user.save();

    const data = { user: { id: user.id, isAdmin: user.isAdmin } };
    const token = jwt.sign(data, "secret_ecom");

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, errors: "Server error during signup" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user && user.password) {
      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (passCompare) {
        const data = { user: { id: user.id, isAdmin: user.isAdmin } };
        const token = jwt.sign(data, "secret_ecom");
        res.json({ success: true, token, user });
      } else {
        res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      res.json({ success: false, errors: "Wrong Email Id" });
    }
  } catch (err) {
    res.status(500).json({ success: false, errors: "Server error during login" });
  }
});

module.exports = router;
