import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/product.js";
import { isAuth, isAdmin } from "./utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      countInStock: req.body.countInStock,
      numReviews: 0,
      brand: req.body.brand,
      rating: 0,
      description: req.body.description,
    });
    const createdProducts = await product.save();
    res
      .status(201)
      .send({ message: "New product created", product: createdProducts });
  })
);

export default productRouter;
