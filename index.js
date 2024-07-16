const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
const usersRouter = require("./routes/users");
const exercisesRouter = require("./routes/exercises");

app.use("/api/users", usersRouter);
app.use("/api/users", exercisesRouter);

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Start server
const port = process.env.PORT || 3000;
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
