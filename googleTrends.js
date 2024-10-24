const googleTrends = require('google-trends-api');
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5433,
  user: 'root',
  password: 'root',
  database: 'db_sjcc'
});

client.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  } else {
    console.log('Conectado ao banco de dados Postgres.');
  }
});

const fetchGoogleTrends = async () => {
    try {
      const results = await googleTrends.dailyTrends({
        geo: 'BR',   
      });
  
      const parsedResults = JSON.parse(results);
      const trendingDays = parsedResults.default.trendingSearchesDays;
  
      console.log(`Encontrado ${trendingDays.length} dias com tópicos de tendências.`);
  
      for (const day of trendingDays) {
        const trendingTopics = day.trendingSearches;
        console.log(`Encontrado ${trendingTopics.length} tópicos no dia.`);
  
        for (const topic of trendingTopics) {
          const title = topic.title.query;
  
          await client.query(
            'INSERT INTO trends (title) VALUES ($1)',
            [title]
          );
          console.log(`Dados inseridos: ${title}`);
        }
      }
    } catch (err) {
      console.error('Erro ao buscar dados do Google Trends:', err);
    }
  };

setInterval(fetchGoogleTrends, 600000);

fetchGoogleTrends();