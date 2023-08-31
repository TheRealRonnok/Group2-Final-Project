const apiRouter = require("express").Router();

// API Home
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

// API Health check
apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
    content: "Server is healthy!",
  });
});

// Users Route:             /api/users
const userRouter = require("./users");
apiRouter.use("/users", userRouter);

// Products Route:          /api/products
const productRouter = require("./products");
apiRouter.use("/products", productRouter);

// Orders Route:            /api/orders
const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

// Order-Details Route:     /api/orderdetails
const orderDetailsRouter = require("./orderdetails");
apiRouter.use("/orderdetails", orderDetailsRouter);

module.exports = apiRouter;
