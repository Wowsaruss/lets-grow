const db = require('./db')
const helpers = require('../helpers')
const config = require('../config')

async function getMany(page = 1) {
    const offset = helpers.getOffset(page, config.listPerPage)
    const rows = await db.query(
        'SELECT * FROM plants OFFSET $1 LIMIT $2',
        [offset, config.listPerPage]
    )
    const data = helpers.emptyOrRows(rows)
    const meta = { page }

    return {
        data,
        meta,
    }
}

module.exports = {
    getMany,
}