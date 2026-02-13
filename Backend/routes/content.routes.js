const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getContentStats
} = require('../controllers/content.controller');
const { protect, authorize } = require('../middleware/auth');

// Public routes (require authentication)
router.get('/', protect, getAllContent);
router.get('/:id', protect, getContentById);

// Admin only routes
router.post('/', protect, authorize('admin'), createContent);
router.put('/:id', protect, authorize('admin'), updateContent);
router.delete('/:id', protect, authorize('admin'), deleteContent);
router.get('/stats/overview', protect, authorize('admin'), getContentStats);

module.exports = router;
