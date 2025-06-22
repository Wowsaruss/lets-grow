import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('growing_zones', (table) => {
        table.increments('id').primary();
        table.string('zone').unique().notNullable();
        table.dateTime('created_at');
        table.dateTime('updated_at');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('growing_zones');
}

