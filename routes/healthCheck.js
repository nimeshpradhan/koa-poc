import Router from "koa-router";

const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = 'ok';
    next();
})

export default router;