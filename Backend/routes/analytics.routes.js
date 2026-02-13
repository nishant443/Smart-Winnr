const express = require('express');
const router = express.Router();
const {
  getOverview,
  getSignupsTrend,
  getActivityTrend,
  getSalesData,
  createAnalytics
} = require('../controllers/analytics.controller');
const { protect, authorize } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/overview', getOverview);
router.get('/signups-trend', getSignupsTrend);
router.get('/activity-trend', getActivityTrend);
router.get('/sales', getSalesData);
router.post('/', createAnalytics);

module.exports = router;
