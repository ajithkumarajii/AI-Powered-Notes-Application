const Note = require('../models/Note');
const mongoose = require('mongoose');
const { sendValidationError, sendAuthError, sendForbiddenError, sendNotFoundError, sendServerError } = require('../utils/errorHandler');
const { summarizeText } = require("../utils/summarizer");

exports.getNotes = async (req, res) => {
  try {
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Notes retrieved successfully', notes });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, summary } = req.body;
    const userId = req.userId;
    if (!title || !content) {
      return sendValidationError(res, 'Title and content are required');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }
    const note = new Note({ userId, title, content, summary: summary || '' });
    await note.save();
    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, summary } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }
    if (!title && !content && !summary) {
      return sendValidationError(res, 'At least one field (title, content, or summary) is required');
    }
    const note = await Note.findById(id);
    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }
    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only update your own notes');
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (summary !== undefined) note.summary = summary;
    await note.save();
    res.status(200).json({ message: 'Note updated successfully', note });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }
    const note = await Note.findById(id);
    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }
    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only delete your own notes');
    }
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }
    const note = await Note.findById(id);
    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }
    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only view your own notes');
    }
    res.status(200).json({ message: 'Note retrieved successfully', note });
  } catch (error) {
    sendServerError(res, error);
  }
};

exports.summarizeNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, "Invalid note ID");
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, "Invalid user ID");
    }
    const note = await Note.findById(id);
    if (!note) {
      return sendNotFoundError(res, "Note not found");
    }
    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, "You can only summarize your own notes");
    }
    if (!note.content || note.content.length < 100) {
      return sendValidationError(res, "Note content too short to summarize (min 100 chars)");
    }
    if (note.summary) {
      return res.json({ summary: note.summary });
    }
    let summary;
    try {
      summary = await summarizeText(note.content);
    } catch (err) {
      return sendServerError(res, "AI summarization failed: " + err.message);
    }
    note.summary = summary;
    await note.save();
    res.json({ summary });
  } catch (error) {
    sendServerError(res, error);
  }
};
