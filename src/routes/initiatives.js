const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadInitiative(ctx, next) {
  ctx.state.initiative = await ctx.orm.initiative.findById(ctx.params.id);
  return next();
}

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
    submitInitiativePath: ctx.router.url('ongInitiativesCreate', ong.id),
  });
});

router.get('ongInitiativesEdit', '/:id/edit', loadInitiative, async (ctx) => {
  const { ong, initiative } = ctx.state;
  await ctx.render('initiatives/edit', {
    ong,
    initiative,
    submitInitiativePath: ctx.router.url('ongInitiativesUpdate', ong.id, initiative.id),
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
      submitInitiativePath: ctx.router.url('ongInitiativesCreate', ong.id),
    });
  }
});

router.patch('ongInitiativesUpdate', '/:id', loadInitiative, async (ctx) => {
  const { ong, initiative } = ctx.state;
  try {
    await initiative.update(ctx.request.body);
    ctx.redirect(ctx.router.url('ongInitiative', { ongId: initiative.ongId, id: initiative.id }));
  } catch (validationError) {
    await ctx.render('initiatives/edit', {
      ong,
      initiative,
      errors: validationError.errors,
      submitInitiativePath: ctx.router.url('ongInitiativesUpdate', ong.id, initiative.id),
    });
  }
});

router.put('ongInitiativeSign', '/:id/sign', loadInitiative, async (ctx) => {
  const { initiative, ong } = ctx.state;
  await initiative.sign(ctx.state.currentUser || ctx.request.body);
  ctx.redirect(ctx.router.url('ongInitiative', ong.id, initiative.id));
});

router.get('ongInitiative', '/:id', loadInitiative, async (ctx) => {
  const { ong, initiative } = ctx.state;
  const initiativeSignsCount = await initiative.countSigns();
  await ctx.render('initiatives/show', {
    initiative,
    initiativeSignsCount,
    signPath: ctx.router.url('ongInitiativeSign', ong.id, initiative.id),
    ong,
  });
});

module.exports = router;
