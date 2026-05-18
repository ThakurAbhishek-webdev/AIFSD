const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

const { getAIRecommendation } = require('../controllers/aiController');

// POST /api/ai/recommend
router.post('/recommend', protect, getAIRecommendation);

module.exports = router;