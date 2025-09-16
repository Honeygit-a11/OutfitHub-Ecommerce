const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  products: [
    {
      productId: Number,
      productName: String,
      quantity: Number,
      price: Number,
      total: Number,
    }
  ],
  totalAmount: { type: Number, required: true },
  // enum: ["Pending", "Accepted", "Shipped", "Out for Delivery","Delivered", "Cancelled"],
  totalAmount: {type:Number, required:true},
  tax:{type:Number,default:0},
  grandTotal:{type:Number , required:true},
  status: { type: String, default: "Pending" }
}, 
{ timestamps: true });


module.exports = mongoose.model('order',orderSchema);