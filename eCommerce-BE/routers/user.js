import express from "express";
import User from "../models/user.js";
import data from "../data.js";
import expressAsyncHandler from "express-async-handler";

// this is to make routing modular instead of all in server.js
const userRouter = express.Router();

// get method for seed api
userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send(createdUsers);
  })
);

export default userRouter;
