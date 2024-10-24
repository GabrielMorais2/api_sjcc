const googleTrends = require('google-trends-api');
const trendsRepository = require('../repositories/trendsRepository');

const fetchGoogleTrends = async () => {
  try {
    const results = await googleTrends.dailyTrends({ geo: 'BR' });
    const parsedResults = JSON.parse(results);

    const trendingDays = parsedResults.default.trendingSearchesDays;


    for (const day of trendingDays) {
      const trendingTopics = day.trendingSearches;

      for (const topic of trendingTopics) {
        const title = topic.title.query;
        await trendsRepository.create({ title });
      }
    }

    await trendsRepository.deleteOldTrends();
    
    console.log('Novos dados inseridos com sucesso.');

  } catch (err) {
    console.error('Erro ao buscar dados do Google Trends:', err);
  }
};

const getTrendsGroupedByCategory = async () => {
  try {
    const result = await trendsRepository.findAll();
    return result;
  } catch (err) {
    console.error('Erro ao buscar trends do banco de dados:', err);
    throw err;
  }
};

module.exports = {
  fetchGoogleTrends,
  getTrendsGroupedByCategory
};
