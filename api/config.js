const env = process.env;

const config = {
  server: {
    port: env.SERVER_PORT ? env.SERVER_PORT : '7070',
    environment: env.SERVER_ENVIRONMENT ? env.SERVER_ENVIRONMENT : 'dev'
  },
  db: {
    host: env.DB_HOST ? env.DB_HOST : '',
    port: env.DB_PORT ? env.DB_PORT : '',
    user: env.DB_USER ? env.DB_USER : '',
    password: env.DB_PASSWORD ? env.DB_PASSWORD : '',
    database: env.DB_NAME ? env.DB_NAME : '',
  },
  listPerPage: env.LIST_PER_PAGE ? env.LIST_PER_PAGE : 10,
};

module.exports = config;