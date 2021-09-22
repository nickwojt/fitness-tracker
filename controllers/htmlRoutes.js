const path = require("path");
const htmlRouter = require("express").Router();

htmlRouter.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

htmlRouter.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = htmlRouter;
