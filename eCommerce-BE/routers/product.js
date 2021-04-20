import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/product.js";
import { isAuth, isAdmin, isSellerOrAdmin } from "./utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const name = req.query.name || "";
    const sellerFilter = seller ? { seller } : {};
    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
    }).populate("seller", "seller.name seller.logo seller.description");
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "seller.name seller.logo seller.rating"
    );
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
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: req.body.name,
      seller: req.user._id,
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

productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.category = req.body.category;
      product.image = req.body.image;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;
      product.brand = req.body.brand;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: "Product updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
