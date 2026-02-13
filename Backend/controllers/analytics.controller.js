const Analytics = require('../models/Analytics');
const User = require('../models/User');

exports.getOverview = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // totalUsers should include all users (banned + unbanned)
    const totalUsers = await User.countDocuments();
    // activeUsers should exclude banned users
    const activeUsers = await User.countDocuments({ isActive: true, isBanned: { $ne: true } });

    const todaySignups = await User.countDocuments({
      createdAt: { $gte: today }
    });

    const todayLogins = await Analytics.countDocuments({
      metricType: 'user_login',
      date: { $gte: today }
    });

    const totalSales = await Analytics.aggregate([
      { $match: { metricType: 'sales' } },
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalUsers,
        activeUsers,
        todaySignups,
        todayLogins,
        totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.getSignupsTrend = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const signupsTrend = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: signupsTrend
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.getActivityTrend = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const activityTrend = await Analytics.aggregate([
      {
        $match: {
          metricType: 'user_login',
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: activityTrend
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.getSalesData = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const salesData = await Analytics.aggregate([
      {
        $match: {
          metricType: 'sales',
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' }
          },
          totalSales: { $sum: '$value' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: salesData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.createAnalytics = async (req, res) => {
  try {
    const { metricType, value, metadata } = req.body;

    const analytics = await Analytics.create({
      metricType,
      value,
      metadata
    });

    res.status(201).json({
      status: 'success',
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};
