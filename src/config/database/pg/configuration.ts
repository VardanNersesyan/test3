import { registerAs } from '@nestjs/config';

export default registerAs('pgConf', () => ({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  dbName: process.env.PG_DB_NAME,
  dbQueriesDebug: process.env.DB_QUERIES_DEBUG,
}));
