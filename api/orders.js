const express = require("express");
const ordersRouter = express.Router();

const {
  createOrder,
  getAllOrders,
  addDetailtoOrder,
  getAllOrdersByUser,
  getOrderByOrderID,
  deleteOrder,
} = require("../db/models");

ordersRouter.use((req, res, next) => {
  next();
});

// GET all Orders from the API
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

// GET all Orders from the API by Username
ordersRouter.get("/:username", async (req, res, next) => {
  try {
    const userOrders = await getAllOrdersByUser({
      username: req.params.username,
    });
    res.send({ userOrders });
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
