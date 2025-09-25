const express = require("express");
const Users = require("../models/User");
const fetchUser = require("../middleware/auth");

const router = express.Router();

// Add to cart
router.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

// Remove from cart
router.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

// Get cart
router.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Clear cart (set all to 0)
router.post("/clearcart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) return res.status(404).send("User not found");
    // reset cartData to zeros (preserve same keys)
    const keys = Object.keys(userData.cartData || {});
    const newCart = {};
    keys.forEach(k => newCart[k] = 0);
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: newCart });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error('Clear cart error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
