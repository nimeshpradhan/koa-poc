import koa from "koa";
import bodyParser from "koa-bodyparser";
import db from "../db/index.js";
import logger from "../logger/winston.js"
class Microservice {
  constructor(router, serverConfig = {}, dbConfig = {}) {
    this.router = router;
    this.serverConfig = serverConfig;
    this.dbConfig = dbConfig

    this.app = new koa();

    // middlewares
    this.serverConfig.enableBodyParser && this.app.use(bodyParser());
    this.appContextPath = this.serverConfig.appContextPath;
    this.appContextPath && this.router.prefix(this.appContextPath);

    // routes
    this.app.use(router.routes());
  }

  start = async () => {
    // database
    await db.init(this.dbConfig);
    this.app.context.db = db.models();

    logger.info(`Server mounted on ${this.appContextPath ? this.appContextPath: '/'} `)
    return this.app.listen(this.serverConfig.port);
  };
}

export default (router, serverConfig, dbConfig) => {
  return new Microservice(router, serverConfig, dbConfig);
};
