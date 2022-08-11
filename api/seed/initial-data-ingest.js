const fs = require('fs')
const Pool = require('pg').Pool
const fastcsv = require('fast-csv')
const config = require('../config')

async function initialDataIngest() {
    let stream = fs.createReadStream('api/seed/plants.csv')
    let csvData = []

    let csvStream = fastcsv
        .parse()
        .on('data', function (data) {
            csvData.push(data)
        })
        .on('end', function () {
            // remove the first line: header
            csvData.shift()
            // create a new connection pool to the database
            const pool = new Pool(config.db)

            const query =
                'INSERT INTO plants (first_name, second_name, family, type, start_indoors, transplant, start_outdoors, fall_start_indoors, fall_transplant, fall_start_outdoors, last_day_to_plant, days_to_germination, germination_temps_f, plant_spacing, row_spacing, seed_depth, days_to_harvest, light, soil, water, pruning, perennial, determinate, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)'

            pool.connect((err, client, done) => {
                if (err) throw err
                try {
                    csvData.forEach((row) => {
                        client.query(query, row, (err, res) => {
                            if (err) {
                                console.log(err.stack)
                            } else {
                                console.log(
                                    'inserted ' + res.rowCount + ' row:',
                                    row
                                )
                            }
                        })
                    })
                } finally {
                    done()
                }
            })
        })
    stream.pipe(csvStream)
}

initialDataIngest()
