const Note = require('../models/Note');
const mongoose = require('mongoose');
const {
  sendValidationError,
  sendAuthError,
  sendForbiddenError,
  sendNotFoundError,
  sendServerError,
} = require('../utils/errorHandler');

// Get all notes for logged-in user
exports.getNotes = async (req, res) => {
  try {
    const userId = req.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }

    const notes = await Note.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Notes retrieved successfully',
      notes,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, summary } = req.body;
    const userId = req.userId;

    // Validation
    if (!title || !content) {
      return sendValidationError(res, 'Title and content are required');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }

    const note = new Note({
      userId,
      title,
      content,
      summary: summary || '',
    });

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, summary } = req.body;
    const userId = req.userId;

    // Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }

    if (!title && !content && !summary) {
      return sendValidationError(res, 'At least one field (title, content, or summary) is required');
    }

    // Find note and verify ownership
    const note = await Note.findById(id);

    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }

    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only update your own notes');
    }

    // Update note
    if (title) note.title = title;
    if (content) note.content = content;
    if (summary !== undefined) note.summary = summary;

    await note.save();

    res.status(200).json({
      message: 'Note updated successfully',
      note,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }

    // Find note and verify ownership
    const note = await Note.findById(id);

    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }

    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only delete your own notes');
    }

    // Delete note
    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: 'Note deleted successfully',
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendValidationError(res, 'Invalid note ID');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendValidationError(res, 'Invalid user ID');
    }

    // Find note and verify ownership
    const note = await Note.findById(id);

    if (!note) {
      return sendNotFoundError(res, 'Note not found');
    }

    if (note.userId.toString() !== userId) {
      return sendForbiddenError(res, 'You can only view your own notes');
    }

    res.status(200).json({
      message: 'Note retrieved successfully',
      note,
    });
  } catch (error) {
    sendServerError(res, error);
  }
};
