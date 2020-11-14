const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
dotenv.config();

//DB CONNECT
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongodb connected:${conn.connection.host}`);
  } catch (error) {
    console.error(`Errır:${error.message}`);
    process.exit(1);
  }
};
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const ___dirname = path.resolve();

app.use("/uploads", express.static(path.join(___dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(___dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(___dirname, "frontend", "build", "index.html"))
  );
}

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
