// routes/exercises.js

const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const User = require("../models/user");

// POST /api/users/:_id/exercises - Add a new exercise for a user
router.post("/:_id/exercises", async (req, res) => {
  try {
    const { description, duration, date } = req.body;
    const userId = req.params._id;

    const newExercise = new Exercise({ userId, description, duration });

    if (date) {
      newExercise.date = new Date(date);
    }

    await newExercise.save();

    const user = await User.findById(userId);
    user.exercises.push(newExercise._id);
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
