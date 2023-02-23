const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");

require("dotenv").config();

// initialize express app

const app = express();

// connect to mongo db notes-app-nextjs
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err.message);
  });

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/notes", noteRoutes);

// test conn

app.get("/test", (req, res) => {
  res.status(200).json({ ok: true });
});
