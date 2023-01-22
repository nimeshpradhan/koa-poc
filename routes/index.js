import Router from "koa-router";
import healthCheck from './healthCheck.js';
import db_crud_example from './db_crud_example.js';
const router = new Router();

router.use('/healthCheck', healthCheck.routes());
router.use('/crud', db_crud_example.routes())

export default router;