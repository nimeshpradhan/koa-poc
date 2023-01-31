import { Sequelize } from "sequelize";
import logger from "../logger/winston.js";
import  User from "./models/users.js";

class db {
  constructor() {
    this._dbInstances = null;
    this._models = null;
  }

  async init(dbConfig) {
    try {
      if (
        dbConfig === null ||
        dbConfig.length === 0 ||
        Object.keys(dbConfig).length === 0
      ) {
        return null;
      }

      this._dbInstances = this._dbInstances || {};
      this._models = this._models || {};

      for (const key of Object.keys(dbConfig)) {
        const _dbConfig = dbConfig[key];
        const connectionOptions = Object.assign(
          {},
          _dbConfig.connectionOptions
        );
        const db = new Sequelize(
          connectionOptions.dialect,
          connectionOptions.user,
          connectionOptions.password,
          {
            host: connectionOptions.host,
            port: connectionOptions.port,
            dialect: _dbConfig.dialect,
            logging: logger.info.bind(logger),
            pool: {},
          }
        );
        await db.authenticate();

        this._dbInstances[key] = db;
        this._models.users = User(Sequelize, db)
      }
      return this._dbInstances;
    } catch (e) {
      this._dbInstances = null;
      this._models = null;
      throw e;
    }
  }

  getInstances() {
    return this._dbInstances;
  }

  models() {
    return this._models;
  }
}

export default new db();
