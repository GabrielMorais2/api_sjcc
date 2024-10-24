const client = require('../db/db');

exports.findAll = async () => {
  try {
    const result = await client.query('SELECT * FROM trends');
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar todos os trends:', err);
    throw err;
  }
};

exports.create = async (trendData) => {
  try {
    const { title } = trendData;
    const result = await client.query(
      'INSERT INTO trends (title) VALUES ($1) RETURNING *',
      [title]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao criar trend:', err);
    throw err;
  }
};

exports.deleteOldTrends = async () => {
  try {
    await client.query('DELETE FROM trends WHERE id NOT IN (SELECT id FROM trends ORDER BY id DESC LIMIT 100)');
    console.log('Dados antigos excluídos com sucesso.');
  } catch (err) {
    console.error('Erro ao excluir trends antigos:', err);
    throw err;
  }
};
