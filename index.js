
import dotenv from 'dotenv';
dotenv.config();import app from './server/index.js';
import router from './routes/index.js';
import logger from './logger/winston.js';

console.log(process.env)
import config from 'config';

const serverConfig = config.get('serverConfig');
const dbConfig = config.has('dbConfig') ? config.get("dbConfig") : null;
console.log( dbConfig)

const server = app (router, serverConfig, dbConfig); 
try {
    const _setup = await server.start();
    logger.info(`server started with config`, _setup)
} catch (error) {
    logger.error('server start-up error:', error);
}