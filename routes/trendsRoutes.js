const express = require('express');
const trendsController = require('../controllers/trendsController');

const router = express.Router();

router.get('/trends', trendsController.getTrends);

module.exports = router;