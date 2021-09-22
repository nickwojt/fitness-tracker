const router = require("express").Router();

const db = require("../models");

router.get("/api/workouts", async (req, res) => {
  try {
    const latestWorkout = await db.Workout.find({});
    console.log(latestWorkout);
    res.json(latestWorkout);
  } catch (e) {
    res.json(e);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
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
        res.json(data);
      }
    }
  );
});

module.exports = router;
