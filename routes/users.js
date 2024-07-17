const express = require("express");
const router = express.Router();
const User = require("../models/user");

// POST /api/users - Create a new user
router.post("/", async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.json({ username: newUser.username, _id: newUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/users - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { username: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
