import app from './server/index.js';
import router from './routes/index.js';
import logger from './logger/winston.js';
import config from './config/index.js';

const serverConfig = config.get('serverConfig');
const dbConfig = config.get("databases");

const server = app(router, serverConfig, dbConfig); 
try {
    const _setup = await server.start();
    logger.info(`server started with config`, _setup)
} catch (error) {
    logger.error('server start-up error:', error);
}