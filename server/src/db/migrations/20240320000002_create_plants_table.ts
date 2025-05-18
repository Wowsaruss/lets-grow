import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('days_to_germination');
    table.integer('days_to_harvest');
    table.text('description');
    table.boolean('determinate');
    table.date('fall_start_indoors');
    table.date('fall_start_outdoors');
    table.date('fall_transplant');
    table.string('family');
    table.string('first_name');
    table.string('germination_temps_f');
    table.date('last_day_to_plant');
    table.string('light');
    table.boolean('perennial');
    table.string('plant_spacing');
    table.text('pruning');
    table.string('row_spacing');
    table.string('second_name');
    table.string('seed_depth');
    table.string('soil');
    table.date('start_indoors');
    table.date('start_outdoors');
    table.date('transplant');
    table.string('type');
    table.string('water');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plants');
} 