const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('ongInitiatives', '/', async (ctx) => {
  const ong = await ctx.orm.ong.findById(ctx.params.ongId);
  const initiatives = await ong.getInitiatives();
  await ctx.render('initiatives/index', { initiatives, ong });
});

module.exports = router;
