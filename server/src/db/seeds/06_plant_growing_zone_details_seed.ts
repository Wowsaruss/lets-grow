import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("plant_growing_zone_details").del();

    // Inserts seed entries
    await knex("plant_growing_zone_details").insert([
        // Tomato in Zone 7a
        {
            id: 1,
            plant_id: 1, // Tomato
            growing_zone_id: 13, // 7a
            spring_start_indoors: '2024-03-15',
            spring_start_outdoors: '2024-05-15',
            spring_transplant: '2024-05-30',
            fall_start_indoors: null,
            fall_start_outdoors: null,
            fall_transplant: null,
            last_day_to_plant: '2024-06-15',
            perennial: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Carrot in Zone 7a
        {
            id: 2,
            plant_id: 2, // Carrot
            growing_zone_id: 13, // 7a
            spring_start_indoors: null,
            spring_start_outdoors: '2024-03-10',
            spring_transplant: null,
            fall_start_indoors: null,
            fall_start_outdoors: '2024-08-01',
            fall_transplant: null,
            last_day_to_plant: '2024-09-01',
            perennial: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Lettuce in Zone 7a
        {
            id: 3,
            plant_id: 3, // Lettuce
            growing_zone_id: 13, // 7a
            spring_start_indoors: '2024-01-15',
            spring_start_outdoors: '2024-02-15',
            spring_transplant: '2024-03-01',
            fall_start_indoors: '2024-09-01',
            fall_start_outdoors: '2024-10-01',
            fall_transplant: '2024-10-15',
            last_day_to_plant: '2024-11-01',
            perennial: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Zucchini in Zone 7a
        {
            id: 4,
            plant_id: 5, // Zucchini
            growing_zone_id: 13, // 7a
            spring_start_indoors: null,
            spring_start_outdoors: '2024-05-01',
            spring_transplant: null,
            fall_start_indoors: null,
            fall_start_outdoors: null,
            fall_transplant: null,
            last_day_to_plant: '2024-07-01',
            perennial: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        // Green Bean in Zone 7a
        {
            id: 5,
            plant_id: 4, // Green Bean
            growing_zone_id: 13, // 7a
            spring_start_indoors: null,
            spring_start_outdoors: '2024-05-20',
            spring_transplant: null,
            fall_start_indoors: null,
            fall_start_outdoors: '2024-08-01',
            fall_transplant: null,
            last_day_to_plant: '2024-08-15',
            perennial: false,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);

    // Reset the sequence so future inserts use the next available id
    await knex.raw(`
      SELECT setval(
        pg_get_serial_sequence('plant_growing_zone_details', 'id'),
        (SELECT MAX(id) FROM plant_growing_zone_details)
      );
    `);
};
