const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getMany(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage)

    const rows = await db.query(
        'SELECT id, name, family, seasons, regions FROM vegetables OFFSET $1 LIMIT $2',
        [offset, config.listPerPage]
    )

    const data = helper.emptyOrRows(rows)
    const meta = { page }

    return {
        data,
        meta,
    }
}

module.exports = {
    getMany,
}
