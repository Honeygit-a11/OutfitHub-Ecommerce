const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const authRoutes = require("./routes/AuthRoutes");
const productRoutes = require("./routes/productsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const paymentRoute = require('./routes/PaymentRoute');

const app = express();
// ensure a default port
const port = process.env.PORT || 7000;

// Server frontend after build (CommonJS: __dirname is available)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

app.use(express.json());
app.use(cors());
// Database connect
connectDB();

// Multer storage
const storage = diskStorage({
  destination: join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Static files
app.use("/uploads", express.static(join(__dirname, "uploads")));

// Upload endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: 0,
      message: "No file uploaded. Make sure the field name is 'product'.",
    });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/uploads/${req.file.filename}`,
  });
});

// If running on Render or other hosts, generate uploads url based on host
// (frontend should receive image_url from server response directly)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use('/api/settings', settingsRoutes);
// app.use('/api', paymentRoute);

// Root
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Start server
app.listen(7000, () => {
  console.log("Server running on port 7000");
});
