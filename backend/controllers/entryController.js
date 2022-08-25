const asyncHandler = require("express-async-handler");

const Entry = require("../models/entryModel");
const User = require("../models/userModel");

// @desc        Get entries
// @route       Get /api/entries
// @access      Private

const getEntries = asyncHandler(async (req, res) => {
  const entries = await Entry.find({ user: req.user.id });
  res.status(200).json(entries);
});

// @desc        Set entry
// @route       Set /api/entries
// @access      Private

const setEntry = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const entry = await Entry.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(entry);
});

// @desc        Update entry
// @route       Put /api/entries/:id
// @access      Private

const updateEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(400);
    throw new Error("Entry not found");
  }

  //const user = await User.findById(req.user.id)

  // Check for user  . user not req.user?
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the entry user,   also user not req.user.id?
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEntry);
});

// @desc        Delete entry
// @route       Delete /api/entries/:id
// @access      Private

const deleteEntry = asyncHandler(async (req, res) => {
  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(400);
    throw new Error("Entry not found");
  }

  //const user = await User.findById(req.user.id);

  // Check for user  . user not req.user?
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the entry user,   also user not req.user.id?
  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await entry.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getEntries,
  setEntry,
  updateEntry,
  deleteEntry,
};
