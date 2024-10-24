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

module.exports = client;