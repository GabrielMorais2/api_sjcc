const trendsService = require('../services/trendsService');

const getTrends = async (req, res) => {
  try {
    const trendsByCategory = await trendsService.getTrendsGroupedByCategory();
    res.json(trendsByCategory);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter os trends.' });
  }
};

module.exports = {
  getTrends
};