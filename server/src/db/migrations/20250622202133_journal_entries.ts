import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('journal_entries', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('plant_id').unsigned().references('id').inTable('plants').onDelete('CASCADE').index();
    table.date('date');
    table.text('subject');
    table.text('body');
    table.dateTime('deleted_at');
    table.dateTime('created_at');
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('journal_entries');
} 