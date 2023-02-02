import Router from "koa-router";

const router = new Router();

router.get("/:id", async (ctx, next) => {
  ctx.body = await ctx.db.User.findAll({
    where: {
      id: ctx.request.params.id,
    },
  });
  next();
});

router.post("/", async (ctx, next) => {
  ctx.body = await ctx.db.User.create({
    id: ctx.request.body.id,
    firstName: ctx.request.body.first_name,
    lastName: ctx.request.body.last_name,
  });
  next();
});

router.put("/", async (ctx, next) => {
  ctx.body = await ctx.db.User.update(
    {
      firstName: ctx.request.body.first_name,
      lastName: ctx.request.body.last_name,
    },
    {
      where: {
        id: ctx.request.body.id,
      },
    }
  );
  next();
});

router.delete("/:id", async (ctx, next) => {
  ctx.body = await ctx.db.User.destroy({
    where: {
      id: ctx.request.params.id,
    },
  });
  next();
});

export default router;
