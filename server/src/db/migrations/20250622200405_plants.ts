import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id').primary();
    table.integer('author_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
    table.string('common_name');
    table.string('scientific_name');
    table.text('description');
    table.integer('plant_family_id').unsigned().references('id').inTable('plant_families').onDelete('CASCADE').index();
    table.integer('plant_type_id').unsigned().references('id').inTable('plant_types').onDelete('CASCADE').index();
    table.integer('days_to_germination');
    table.integer('days_to_harvest');
    table.boolean('indeterminate');
    table.integer('germination_temp_high');
    table.integer('germination_temp_low');
    table.string('light');
    table.string('water');
    table.string('soil');
    table.boolean('perennial');
    table.boolean('heirloom');
    table.boolean('hybrid');
    table.boolean('open_pollinated');
    table.boolean('self_pollinated');
    table.integer('spacing');
    table.integer('row_spacing');
    table.text('pruning');
    table.string('sowing_depth');
    table.dateTime('deleted_at');
    table.dateTime('created_at');
    table.dateTime('updated_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plants');
} 