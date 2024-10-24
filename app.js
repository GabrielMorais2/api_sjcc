const express = require('express');
const { fetchGoogleTrends, getTrendsGroupedByCategory } = require('./services/trendsService');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de tendências!');
});

app.get('/trends', async (req, res) => {
  try {
    const trends = await getTrendsGroupedByCategory();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tendências' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  fetchGoogleTrends();
  
  setInterval(fetchGoogleTrends, 100000);
});