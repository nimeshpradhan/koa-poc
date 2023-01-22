import monitor from "pg-monitor";
import massive from "massive";
import Instance from "./Instance.js";
import logger from "../logger/winston.js";

class db {
  constructor() {
    this._dbInstances = [];
  }

  async init(dbConfig) {
    try {
      this._dbConfig = dbConfig;
      if (this._dbConfig === null || this._dbConfig.length === 0 || Object.keys(this._dbConfig).length === 0) {
        return null;
      }
      for (const key of Object.keys(this._dbConfig)) {
        const dbConfig = this._dbConfig[key];
        const loaderConfig = Object.assign({}, dbConfig.loaderConfig);
        const driverConfig = Object.assign({}, dbConfig.driverConfig);
        const connectionOptions = Object.assign({}, dbConfig.connectionOptions);
        const db = await massive(
          connectionOptions,
          loaderConfig,
          driverConfig
        );

        const dbInstance = new Instance(db, connectionOptions);
        this._dbInstances.push(dbInstance);

        logger.info(
          `database instance added. tables: %s views: %s functions: %s`,
          dbInstance.listTables(),
          dbInstance.listViews(),
          dbInstance.listFunctions()
        );
        if (dbConfig.enableMonitor === true) {
          monitor.attach(dbInstance.driverConfig);
        }
      }

      return this._dbInstances;
    } catch (e) {
      this._dbInstances.length = 0;
      this._dbConfig = null
      throw e;
    }
  }

  getInstance(instanceName = null) {
    if (instanceName === null) {
      return (
        this._dbInstances.find((_i) => _i.name === "default") ||
        this._dbInstances[0]
      );
    }
    const instance = this._dbInstances.find((_i) => _i.name === instanceName);
    if (instance) {
      return instance;
    } else {
      logger.warn(`no instance found`);
      return null;
    }
  }

  models() {
    let tables = {};
    if (this._dbInstances) {
      for (let dbInstance of this._dbInstances) {
        const tablesNames = dbInstance.listTables();
        tablesNames.forEach((name) => {
          if (dbInstance.getConnectionOptions()?.schema != "public") {
            tables[name.split(".")[1]] =
              dbInstance[dbInstance.getConnectionOptions().schema][
                name.split(".")[1]
              ];
          } else {
            tables[name] = dbInstance[name];
          }
        });
      }
    }
    return tables;
  }
}

export default new db();
