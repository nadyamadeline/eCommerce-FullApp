import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routers/user.js"; // in server-side programming, we need to append the .js extension
import ProductRouter from "./routers/product.js";
// import dotenv from "dotenv";
import orderRouter from "./routers/order.js";
import uploadRouter from "./routers/upload.js";
import path from "path";
import config from "./config.js";

// dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// upload image
app.use("/api/uploads", uploadRouter);

// show sample user
app.use("/api/users", UserRouter);

// show sample products
app.use("/api/products", ProductRouter);

// show order
app.use("/api/orders", orderRouter);

// api for paypal
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// display image in FE
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// connect to FE build
app.use(express.static(path.join(__dirname, "eCommerce-FE/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "eCommerce-FE/build/index.html"));
});

// set the root of our server
// app.get("/", (req, res) => {
//   res.send("Server is ready");
// });

// display error message (error catcher)
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// listening on port 5000
app.listen(config.PORT, () => {
  console.log(`Serve at http://localhost:${config.PORT}`);
});
