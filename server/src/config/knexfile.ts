import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log(process.env.DB_NAME)
console.log('CWD:', process.cwd());

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME || 'lets_grow',
      user: process.env.DB_USER || 'russellhayes',
      password: process.env.DB_PASSWORD || '',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '../db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, '../db/seeds')
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT)
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '../db/migrations')
    }
  }
}; 