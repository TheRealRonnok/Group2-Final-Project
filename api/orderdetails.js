const express = require("express");
const orderDetailsRouter = express.Router();

const {
  getAllOrderDetails,
  removeItemFromOrder,
  getOrderByOrderID,
} = require("../db/models");

orderDetailsRouter.use((req, res, next) => {
  next();
});

// GET all Order Details from the API
orderDetailsRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrderDetails();
    res.send({ orders });
  } catch (error) {
    next(error);
  }
});

// DELETE an Order Detail from an Order
// orderDetailsRouter.delete("/:orderid/:productid", async (req, res, next) => {
//   let orderid = parseInt(req.params.orderid);
//   let productid = parseInt(req.params.productid);

//   try {
//     const deleteItem = await getOrderByOrderID(orderid, productid);

//     await removeItemFromOrder(orderid, productid);

//     res.send({
//         message: "Order Detail deleted successfully!"
//         ...deleteItem,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = orderDetailsRouter;
