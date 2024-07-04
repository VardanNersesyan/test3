// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10) || 5432,
  username: process.env.PG_USER || 'root',
  password: process.env.PG_PASSWORD || '',
  database: process.env.PG_DB_NAME || 'database',
  logging: process.env.DB_QUERIES_DEBUG === 'true' ? console.log : false,
};
