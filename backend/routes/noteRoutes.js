const express = require('express');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
