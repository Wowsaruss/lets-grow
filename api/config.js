const env = process.env

const config = {
    server: {
        port: env.SERVER_PORT ? env.SERVER_PORT : '7070',
        environment: env.SERVER_ENVIRONMENT ? env.SERVER_ENVIRONMENT : 'dev',
    },
    db: {
        connectionString: process.env.DB_URI,
        ssl: {
            rejectUnauthorized: false,
        },
    },
    listPerPage: env.LIST_PER_PAGE ? env.LIST_PER_PAGE : 10,
}

module.exports = config
