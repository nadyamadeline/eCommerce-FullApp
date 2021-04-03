import express from "express";
import data from "./data.js"; // in server-side programming, we need to append the .js extension
const app = express();

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
