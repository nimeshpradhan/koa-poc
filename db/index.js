import { Sequelize } from "sequelize";
import logger from "../logger/winston.js";
import fs from "fs";
import path from "path";

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
        const db = new Sequelize(
          _dbConfig.dialect,
          _dbConfig.user,
          _dbConfig.password,
          {
            host: _dbConfig.host,
            port: _dbConfig.port,
            dialect: _dbConfig.dialect,
            logging: logger.info.bind(logger),
            pool: _dbConfig.pool,
          }
        );
        await db.authenticate();

        this._dbInstances[key] = db;
        const files = fs.readdirSync(
          path.join(path.resolve(), "db", "models", key)
        );
        for (let file of files) {
          const { default: Model } = await import(`./models/${key}/${file}`);
          if (_dbConfig.schema != null) {
            this._models[Model.name] = Model(Sequelize, db).schema(
              _dbConfig.schema
            );
          } else {
            this._models[Model.name] = Model(Sequelize, db);
          }
        }
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
