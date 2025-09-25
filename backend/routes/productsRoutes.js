const express = require("express");
const Product = require("../models/Product");
const fetchUser = require("../middleware/auth");
const fetchAdmin = require("../middleware/admin");

const router = express.Router();

// Add product (Admin only)
router.post("/addproduct", fetchUser, fetchAdmin, async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Remove product (Admin only)
router.post("/removeproduct", fetchUser, fetchAdmin, async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, id: req.body.id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to remove product" });
  }
});

// Get all products
router.get("/allproducts", async (req, res) => {
  try {
    let products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

module.exports = router;
