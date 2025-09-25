const express = require("express");
const router = express.Router();
const Users = require("../models/User");

// Get all users
router.get("/", async (req,res)=> {
  try{
    const users = await Users.find({},"email");
    res.json(users);
  }catch(err){
    res.status(500).json({error:err.message});
  }
});
module.exports = router;