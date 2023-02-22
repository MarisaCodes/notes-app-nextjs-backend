const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const noteModel = require("./models/noteModel");

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
app.get("/", (req, res) => {
  try {
    noteModel
      .find((err, docs) => {
        if (err) {
          throw Error(err.message);
        } else {
          res.status(200).json(docs);
        }
      })
      .sort({ updatedAt: -1 });
  } catch (err) {
    res.status(400).json(err.message);
  }
});
app.post("/", (req, res) => {
  noteModel
    .create(req.body)
    .then((note) => {
      res.status(200).json(note);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});
