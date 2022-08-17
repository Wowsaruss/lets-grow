const fs = require('fs')
const db = require('./db')
const helpers = require('../helpers')
const config = require('../config')

const updatePlant = fs
    .readFileSync('api/db-queries/update_plant.sql')
    .toString()

async function getMany(page = 1) {
    const offset = helpers.getOffset(page, config.listPerPage)
    const rows = await db.query('SELECT * FROM plants OFFSET $1 LIMIT $2', [
        offset,
        config.listPerPage,
    ])
    const data = helpers.emptyOrRows(rows)
    const meta = { page }

    return {
        data,
        meta,
    }
}

async function getOne(plantId) {
    const rows = await db.query('SELECT * FROM plants WHERE plants.id = $1', [
        plantId,
    ])

    return {
        data: rows[0],
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

module.exports = {
    getMany,
    getOne,
    updateOne,
}
