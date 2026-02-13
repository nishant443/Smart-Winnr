const Content = require('../models/Content');

exports.getAllContent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.contentType) filter.contentType = req.query.contentType;

    const content = await Content.find(filter)
      .populate('author', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(filter);

    res.status(200).json({
      status: 'success',
      data: content,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!content) {
      return res.status(404).json({
        status: 'error',
        message: 'Content not found'
      });
    }

    content.views += 1;
    await content.save();

    res.status(200).json({
      status: 'success',
      data: content
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.createContent = async (req, res) => {
  try {
    const { title, description, contentType, status } = req.body;

    const content = await Content.create({
      title,
      description,
      contentType,
      status,
      author: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: content
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const { title, description, contentType, status, isActive } = req.body;

    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        status: 'error',
        message: 'Content not found'
      });
    }

    if (title) content.title = title;
    if (description) content.description = description;
    if (contentType) content.contentType = contentType;
    if (status) content.status = status;
    if (typeof isActive !== 'undefined') content.isActive = isActive;

    await content.save();

    res.status(200).json({
      status: 'success',
      data: content
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        status: 'error',
        message: 'Content not found'
      });
    }

    await content.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};

exports.getContentStats = async (req, res) => {
  try {
    const totalContent = await Content.countDocuments();
    const publishedContent = await Content.countDocuments({ status: 'published' });
    const draftContent = await Content.countDocuments({ status: 'draft' });
    const archivedContent = await Content.countDocuments({ status: 'archived' });

    const viewsData = await Content.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalContent,
        publishedContent,
        draftContent,
        archivedContent,
        totalViews: viewsData.length > 0 ? viewsData[0].totalViews : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Server error'
    });
  }
};
