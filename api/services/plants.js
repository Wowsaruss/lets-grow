const fs = require('fs')
const db = require('./db')
const helpers = require('../helpers')
const config = require('../config')

const selectAllPlants = fs
    .readFileSync('api/db-queries/select_all_plants.sql')
    .toString()

const selectPlant = fs
    .readFileSync('api/db-queries/select_plant.sql')
    .toString()

const createPlant = fs
    .readFileSync('api/db-queries/create_plant.sql')
    .toString()

const updatePlant = fs
    .readFileSync('api/db-queries/update_plant.sql')
    .toString()

const deletePlant = fs
    .readFileSync('api/db-queries/delete_plant.sql')
    .toString()

async function getMany(page = 1) {
    const offset = helpers.getOffset(page, config.listPerPage)
    const rows = await db.query(selectAllPlants, [offset, config.listPerPage])
    const data = helpers.emptyOrRows(rows)
    const meta = { page }

    return {
        data,
        meta,
    }
}

async function getOne(plantId) {
    const rows = await db.query(selectPlant, [plantId])

    return {
        data: rows[0],
    }
}

async function createOne(body) {
    const rows = await db.query(createPlant, [
        body.days_to_germination,
        body.days_to_harvest,
        body.description,
        body.determinate,
        body.fall_start_indoors,
        body.fall_start_outdoors,
        body.fall_transplant,
        body.family,
        body.first_name,
        body.germination_temps_f,
        body.last_day_to_plant,
        body.light,
        body.perennial,
        body.plant_spacing,
        body.pruning,
        body.row_spacing,
        body.second_name,
        body.seed_depth,
        body.soil,
        body.start_indoors,
        body.start_outdoors,
        body.transplant,
        body.type,
        body.water,
        new Date().toISOString(),
        new Date().toISOString(),
    ])

    return {
        data: { rows },
    }
}

async function updateOne(plantId, body) {
    const rows = await db.query(updatePlant, [
        plantId,
        body.days_to_germination,
        body.days_to_harvest,
        body.description,
        body.determinate,
        body.fall_start_indoors,
        body.fall_start_outdoors,
        body.fall_transplant,
        body.family,
        body.first_name,
        body.germination_temps_f,
        body.last_day_to_plant,
        body.light,
        body.perennial,
        body.plant_spacing,
        body.pruning,
        body.row_spacing,
        body.second_name,
        body.seed_depth,
        body.soil,
        body.start_indoors,
        body.start_outdoors,
        body.transplant,
        body.type,
        body.water,
        new Date().toISOString(),
    ])

    return {
        data: { rows },
    }
}

async function deleteOne(plantId) {
    const rows = await db.query(deletePlant, [plantId])

    return {
        data: rows[0],
    }
}

module.exports = {
    getMany,
    getOne,
    createOne,
    updateOne,
    deleteOne,
}
