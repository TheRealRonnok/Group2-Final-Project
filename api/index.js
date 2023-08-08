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

// ROUTE: Login
apiRouter.get("/login", (req, res, next) => {
  res.send({
    message: "User Login!",
  });
});

// ROUTE: Sign Up
apiRouter.get("/signup", (req, res, next) => {
  res.send({
    message: "Sign Up!",
  });
});

// ROUTE: My Cart
apiRouter.get("/cart", (req, res, next) => {
  res.send({
    message: "User's Cart!",
  });
});

module.exports = apiRouter;
