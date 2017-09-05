const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('ongInitiatives', '/', async (ctx) => {
  const { ong } = ctx.state;
  const initiatives = await ong.getInitiatives();
  await ctx.render('initiatives/index', {
    initiatives,
    ong,
    buildInitiativePath: initiative =>
      ctx.router.url('ongInitiative', { ongId: initiative.ongId, id: initiative.id }),
  });
});

router.get('ongInitiativesNew', '/new', async (ctx) => {
  const { ong } = ctx.state;
  const initiative = ctx.orm.initiative.build();
  await ctx.render('initiatives/new', {
    ong,
    initiative,
    createInitiativePath: ctx.router.url('ongInitiativesCreate', ong.id),
  });
});

router.post('ongInitiativesCreate', '/', async (ctx) => {
  const { ong } = ctx.state;
  try {
    const initiative = await ong.createInitiative(ctx.request.body);
    ctx.redirect(ctx.router.url('ongInitiative', { ongId: initiative.ongId, id: initiative.id }));
  } catch (validationError) {
    await ctx.render('initiatives/new', {
      ong,
      initiative: ctx.orm.initiative.build(ctx.request.body),
      errors: validationError.errors,
      createInitiativePath: ctx.router.url('ongInitiativesCreate', ong.id),
    });
  }
});

router.get('ongInitiative', '/:id', async (ctx) => {
  const { ong } = ctx.state;
  const initiatives = await ong.getInitiatives({
    where: { id: ctx.params.id },
    limit: 1,
  });
  const initiative = initiatives[0];
  await ctx.render('initiatives/show', { initiative, ong });
});

module.exports = router;
