const router = require("express").Router();
const {
  getNotes,
  getNote,
  postNote,
  deleteNote,
  patchNote,
} = require("../controllers/noteControllers");
// GET Notes request

router.get("/", getNotes);

// GET single Note request
router.get("/:id", getNote);
// POST note request
router.post("/", postNote);
// Delete note request
router.delete("/:id", deleteNote);
// PATCH (single) note request
router.patch("/:id", patchNote);
module.exports = router;
