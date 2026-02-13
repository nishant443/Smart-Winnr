const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  metricType: {
    type: String,
    required: true,
    enum: ['user_signup', 'user_login', 'sales', 'page_view', 'active_users']
  },
  value: {
    type: Number,
    required: true,
    default: 0
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient querying
analyticsSchema.index({ metricType: 1, date: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
