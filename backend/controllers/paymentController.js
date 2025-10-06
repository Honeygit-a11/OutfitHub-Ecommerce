// const express = require("express");
// const Stripe = require("stripe");
// require('dotenv').config();
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// app.post("/api/create-payment-intent", async (req, res) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000, // amount in cents
//     currency: "rupee",
//   });
//   res.json({ clientSecret: paymentIntent.client_secret });
// });