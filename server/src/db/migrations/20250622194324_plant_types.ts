import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plant_types', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').unique().notNullable();
    table.text('description');
    table.dateTime('created_at');
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plant_types');
}