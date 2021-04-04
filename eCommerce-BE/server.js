import express from "express";
import data from "./data.js"; // in server-side programming, we need to append the .js extension
const app = express();

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

// set the root of our server
app.get("/", (req, res) => {
  res.send("Server is ready");
});

const port = process.env.PORT || 5000;

// listening on port 5000
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
