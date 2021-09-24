const router = require("express").Router();
const mongoose = require("mongoose");

const db = require("../models");
//Get Route for one workout
router.get("/api/workouts", async (req, res) => {
  db.Workout.aggregate([
    {
      $set: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ]).then((result) => {
    res.json(result);
  });
});

router.get("/api/workouts/range", (req, res) => {
  console.log("Dash Board to get all information");

  db.Workout.aggregate([
    {
      $set: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .sort({ day: -1 })
    .limit(7)
    .sort({ day: 1 })
    .then((result) => {
      console.log("Result of Aggregate");
      console.log(result);
      res.json(result);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  console.log("hello");
  console.log(req.body);
  await db.Workout.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
    },
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
});

router.post("/api/workouts", async (req, res) => {
  const data = await db.Workout.create({});
  res.json(data);
});

module.exports = router;
