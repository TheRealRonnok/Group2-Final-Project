const express = require ("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {requireUser} = require('./errorMessage')
const {getUserByUsername, createUser} = require('../db/models/user.js');

//POST /api/users/register

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
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
      const newUser = await createUser(req.body);
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
router.post('/login', async (req, res, next) => {
    const { username, password} = req.body;
    if (!username || !password) {
        next({
            error: "Login Error",
            name: "MissingCredentials",
            message: "Please provide both a username and password"
        })
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
                    username: user.username
                },
                message: "Log in succes!",
                token: token
            })
        } else {
            next({
                error: "Login Error",
                name: "IncorrectCredentials",
                message: "Username or password is incorrect"
            })
        }
    } catch ({ error, name, message }) {
      next({ error, name, message });
    }
});