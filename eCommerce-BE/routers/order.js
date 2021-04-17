import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAuth, isAdmin } from "../routers/utils.js";

const orderRouter = express.Router();

orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.find({}).populate("user", "name"); // populate is like join in SQL
    res.send(order);
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else if (req.body.shippingInfo.length === 0) {
      res.status(400).send({ message: "Shipping address is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingInfo: req.body.shippingInfo,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New order created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      for (const index in updatedOrder.orderItems) {
        const item = updatedOrder.orderItems[index];
        const product = await Product.findById(item.product);
        product.countInStock -= item.qty;
        product.sold += item.qty;
        await product.save();
      }

      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deletedOrder = await order.remove();
      res.send({ message: "Order deleted", order: deletedOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

orderRouter.put(
  "/:id/deliver",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  })
);

export default orderRouter;
