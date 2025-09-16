const Order = require("../models/Order");

exports.getOrders = async(req,res) => {
  try{
    const orders = await Order.find().sort({createdAt: -1});
    res.json(orders);
  } catch(err){
    res.status(500).json({error:err.message});
  }
};

//create new order

exports.createOrder = async (req,res) =>{
  try{
     console.log("Incoming order:", req.body);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
  }catch(err){
   console.error("Order creation failed:", err);
   res.status(500).json({error:err.message});
  }
};

// order accept
exports.updateOrder = async (req,res) =>{
  try{
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Order not found" });

    res.json(updated);
  }catch(err){
      res.status(500).json({error:err.message});
  }
};

//delete order
exports.deleteOrder = async (req,res) =>{
  try{
    await Order.findByIdAndDelete(req.params.id);
    res.json({message:"order deleted"});
  }catch(err){
    res.status(500).json({error:err.message});
  }
};
