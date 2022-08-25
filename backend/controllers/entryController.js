const asyncHandler = require("express-async-handler");

// @desc        Get entries
// @route       Get /api/entries
// @access      Private

const getEntries = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get entries" });
});

// @desc        Set entry
// @route       Set /api/entries
// @access      Private

const setEntry = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Set entries" });
});

// @desc        Update entry
// @route       Put /api/entries/:id
// @access      Private

const updateEntry = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update entry ${req.params.id}` });
});

// @desc        Delete entry
// @route       Delete /api/entries/:id
// @access      Private

const deleteEntry = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete entry ${req.params.id}` });
});

module.exports = {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
};
