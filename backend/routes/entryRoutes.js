const express = require("express");
const { set } = require("mongoose");
const { setegid } = require("process");
const router = express.Router();
const {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
} = require("../controllers/entryController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEntries).post(protect, setEntry);
router.route("/:id").delete(protect, deleteEntry).put(protect, updateEntry);

module.exports = router;
