import Router from "koa-router";

const router = new Router();

router.get('/:id', async (ctx, next) => {
    ctx.body = await ctx.db.users.find({
        id: ctx.request.params.id
    });
    next();
})

router.post('/', async (ctx, next) => {
    ctx.body = await ctx.db.users.insert({
        id: ctx.request.body.id,
        first_name: ctx.request.body.first_name,
        last_name: ctx.request.body.last_name
    });
    next();
})

router.put('/', async (ctx, next) => {
    ctx.body = await ctx.db.users.update( ctx.request.body.id ,{
        first_name: ctx.request.body.first_name,
        last_name: ctx.request.body.last_name
    });
    next();
})

router.delete('/:id', async (ctx, next) => {
    ctx.body = await ctx.db.users.destroy( ctx.request.params.id);
    next();
})


export default router;