/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable('vegetables', {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
        regions: { type: 'array' },
        seasons: { type: 'array' },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('vegetables', 'name')
}

exports.down = (pgm) => {}
