import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routers/user.js"; // in server-side programming, we need to append the .js extension
import ProductRouter from "./routers/product.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/canopyco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// show sample user
app.use("/api/users", UserRouter);

// show sample products
app.use("/api/products", ProductRouter);

// set the root of our server
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// display error message (error catcher)
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
// listening on port 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
