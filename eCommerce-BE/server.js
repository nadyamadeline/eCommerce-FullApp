import express from "express";
import mongoose from "mongoose";
import data from "./data.js"; // in server-side programming, we need to append the .js extension
import UserRouter from "./routers/user.js";

const app = express();
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/canopyco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// display product detail
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === Number(req.params.id));
  // need to convert req.params.id to number as it returns a string while our id is denoted as number
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
// display product data
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
// show sample user
app.use("/api/users", UserRouter);

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
