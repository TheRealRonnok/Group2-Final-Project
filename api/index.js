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

// Users Route
const userRouter = require("./users");
apiRouter.use("/users", userRouter);

// Products Route
const productRouter = require("./products");
apiRouter.use("/products", productRouter);

module.exports = apiRouter;
