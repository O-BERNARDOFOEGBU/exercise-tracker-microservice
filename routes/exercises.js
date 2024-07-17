const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const User = require("../models/user");

// POST /api/users/:id/exercises - Add a new exercise for a user
router.post("/:id/exercises", async (req, res) => {
  try {
    const { description, duration, date } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExercise = new Exercise({
      userId,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    await newExercise.save();

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

// GET /api/users/:id/logs - Get a user's exercise log
router.get("/:id/logs", async (req, res) => {
  try {
    const userId = req.params.id;
    const { from, to, limit } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let query = { userId };
    if (from) {
      query.date = { ...query.date, $gte: new Date(from) };
    }
    if (to) {
      query.date = { ...query.date, $lte: new Date(to) };
    }

    let exercises = await Exercise.find(query)
      .limit(parseInt(limit) || 0)
      .exec();

    const log = exercises.map((exercise) => ({
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date.toDateString(),
    }));

    res.json({
      _id: user._id,
      username: user.username,
      count: log.length,
      log: log,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
