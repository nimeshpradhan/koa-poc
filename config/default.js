export default {
  serverConfig: {
    appContextPath: "/v1/demo/",
    enableBodyParser: true,
    port: process.env.PORT || 8080,
  },
  databases: {
    postgres: {
      dialect: process.env.POSTGRES_DB_DIALECT,
      user: process.env.POSTGRES_DB_USER,
      host: process.env.POSTGRES_DB_HOST,
      password: process.env.POSTGRES_DB_PWD,
      port: process.env.POSTGRES_DB_PORT,
      schema: process.env.POSTGRES_DB_SCHEMA,
      ssl: false,
      pool: {},
    },
  },
  logger: {
    level: process.env.LOG_LEVEL,
  },
};
