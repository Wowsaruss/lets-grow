import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Debug environment variables
console.log('Database Environment Variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Parse DATABASE_URL if available
function parseDatabaseUrl() {
  if (!process.env.DATABASE_URL) return null;

  try {
    const url = new URL(process.env.DATABASE_URL);
    return {
      database: url.pathname.slice(1), // Remove leading slash
      user: url.username,
      password: url.password,
      host: url.hostname,
      port: Number(url.port) || 5432
    };
  } catch (error) {
    console.error('Error parsing DATABASE_URL:', error);
    return null;
  }
}

const parsedUrl = parseDatabaseUrl();

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
    connection: parsedUrl || {
      database: process.env.DB_NAME || 'lets_grow',
      user: process.env.DB_USER || 'postgres',
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
    }
  }
}; 