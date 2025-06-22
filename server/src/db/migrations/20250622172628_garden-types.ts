import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('garden_types', (table) => {
        table.increments('id').primary();
        table.string('title').unique().notNullable();
        table.string('description').notNullable();
        table.dateTime('created_at');
        table.dateTime('updated_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('garden_types');
}

