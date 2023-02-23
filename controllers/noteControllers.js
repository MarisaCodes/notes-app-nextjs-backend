const { default: mongoose } = require("mongoose");
const noteModel = require("../models/noteModel");

// GET Notes request
const getNotes = (req, res) => {
  noteModel
    .find()
    .sort({ updatedAt: -1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};

// GET single Note request
const getNote = (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      noteModel
        .findById(req.params.id)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(404).json(err.message);
        });
    } else {
      throw Error("Unable to get note, please check if note exists");
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};

// POST note request
const postNote = (req, res) => {
  noteModel
    .create(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json(err.message);
    });
};
// Delete note request
const deleteNote = (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      noteModel
        .findByIdAndDelete(req.params.id)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(404).json(err.message);
        });
    } else {
      throw Error("Unable to delete note, please check if note exists");
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};
// PATCH (single) note request
const patchNote = (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      noteModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(404).json(err.message);
        });
    } else {
      throw Error("Unable to edit note, please check if note exists");
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
};
module.exports = {
  getNotes,
  getNote,
  postNote,
  deleteNote,
  patchNote,
};
