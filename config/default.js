export default {
  "serverConfig": {
    "appContextPath": "/v1/demo/",
    "enableBodyParser": true,
    "port": process.env.PORT || 8080
  },
  "databases": {
    "postgres": {
      "enableMonitor": true,
      "dialect": "postgres",
      "connectionOptions": {
        "user": process.env.DB_USER,
        "host": process.env.DB_HOST,
        "password": process.env.DB_PWD,
        "port": process.env.DB_PORT,
        "schema": process.env.DB_SCHEMA,
        "ssl": false,
        "poolSize": 10
      }
    }
  },
  "logger": {
    "level": process.env.LOG_LEVEL
  }
}
