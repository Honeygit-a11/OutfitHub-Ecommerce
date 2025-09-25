const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const Coupon = require('../models/Coupon');
const fetchUser = require('../middleware/auth');
const fetchAdmin = require('../middleware/admin');

// GET GST
router.get('/gst', async (req, res) => {
  try {
    const doc = await Setting.findOne({ key: 'gst' });
    return res.json({ gst: doc ? doc.value : null });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save GST (admin only)
router.post('/gst', fetchUser, fetchAdmin, async (req, res) => {
  try {
    const { gst } = req.body;
    if (gst === undefined || gst === null || isNaN(gst)) {
      return res.status(400).json({ message: 'Invalid GST value' });
    }
    await Setting.findOneAndUpdate({ key: 'gst' }, { value: Number(gst) }, { upsert: true, new: true });
    return res.json({ message: 'GST saved', gst: Number(gst) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create coupon (admin only)
router.post('/coupon', fetchUser, fetchAdmin, async (req, res) => {
  try {
    const { code, discount } = req.body;
    if (!code || discount === undefined || isNaN(discount)) {
      return res.status(400).json({ message: 'Invalid coupon data' });
    }
    const existing = await Coupon.findOne({ code });
    if (existing) return res.status(400).json({ message: 'Coupon already exists' });
    const coupon = new Coupon({ code, discount });
    await coupon.save();
    res.json({ message: 'Coupon created', coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Apply coupon (user) - marks coupon used
router.post('/apply-coupon', fetchUser, async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: 'Code required' });
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    if (coupon.used) return res.status(400).json({ message: 'Coupon already used' });
    coupon.used = true;
    await coupon.save();
    return res.json({ message: 'Coupon applied', discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
