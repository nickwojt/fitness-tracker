const router = require("express").Router();

const db = require("../models");

router.get("/workouts", async (req, res) => {
  try {
    const latestWorkout = await db.Workout.findOne({}).sort({ day: -1 });
    console.log(latestWorkout.exercises);
    res.json(latestWorkout);
  } catch (e) {
    res.json(e);
  }
});

module.exports = router;
