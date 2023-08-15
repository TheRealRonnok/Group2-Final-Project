const express = require("express");
const productRouter = express.Router();

const { getAllFigures, createActionFigure } = require("../db/models");

productRouter.use("/", (req, res, next) => {
  console.log("Entered the Products Router...");
  next();
});

// GET all Actionfigures from the API
productRouter.get("/", async (req, res, next) => {
  try {
    const actionFigures = await getAllFigures();
    res.send({ actionFigures });
  } catch (error) {
    next(error);
  }
});

// POST actionfigures to the API
productRouter.post("/", async (req, res, next) => {
  try {
    const newActionFigure = await createActionFigure(req.body);
    res.send({ newActionFigure });
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
