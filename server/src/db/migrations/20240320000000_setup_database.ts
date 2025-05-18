import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create database if it doesn't exist
  await knex.raw(`CREATE DATABASE ${process.env.DB_NAME || 'lets_grow_dev'} WITH OWNER = ${process.env.DB_USER || 'postgres'}`);
  
  // Enable UUID extension
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  
  // Enable full text search
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pg_trgm"');
  
  // Set timezone to UTC
  await knex.raw('SET timezone = \'UTC\'');
}

export async function down(knex: Knex): Promise<void> {
  // Drop database
  await knex.raw(`DROP DATABASE IF EXISTS ${process.env.DB_NAME || 'lets_grow_dev'}`);
} 