const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./errorMessage");
const {
  getAllUsers,
  getUserByUsername,
  createUser,
} = require("../db/models/user.js");

// Connect to the users Route
userRouter.use("/", (req, res, next) => {
  console.log("Entered the Users Router...");
  next();
});

// GET all Users from the API
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send({ users });
  } catch (error) {
    next(error);
  }
});

//POST /api/users/register
userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body.user;
  //check if the user exists
  try {
    const userExist = await getUserByUsername(username);
    if (userExist) {
      next({
        error: "Error registering",
        name: "UserExists",
        message: `User ${username} is already taken.`,
      });
    }
    if (password.length < 8) {
      next({
        error: "Error registering",
        message: "Password Too Short!",
        name: "InvalidPassword",
      });
    } else {
      const newUser = await createUser(req.body.user);
      console.log({id: newUser.id, secret: process.env.JWT_SECRET})
      const token = jwt.sign(
        {
          id: newUser.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "14days",
        }
      );
        console.log({token})
      res.send({
        message: "Registration successful!",
        token: token,
        user: {
          id: newUser.id,
          username: username,
        },
      });
    }
  } catch ({ error, name, message }) {
    next({ error, name, message });
  }
});

// POST /api/users/login
userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body.user;
  if (!username || !password) {
    next({
      error: "Login Error",
      name: "MissingCredentials",
      message: "Please provide both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password === password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({
        user: {
          id: user.id,
          username: user.username,
        },
        message: "Log in succes!",
        token: token,
      });
    } else {
      next({
        error: "Login Error",
        name: "IncorrectCredentials",
        message: "Username or password is incorrect",
      });
    }
  } catch ({ error, name, message }) {
    next({ error, name, message });
  }
});

module.exports = userRouter;
