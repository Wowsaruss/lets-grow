import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plant_families', (table) => {
    table.increments('id').primary();
    table.string('name').unique().notNullable();
    table.text('description');
    table.date('created_at');
    table.date('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plant_families');
}