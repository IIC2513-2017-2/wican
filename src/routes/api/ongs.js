const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  const ongs = await ctx.orm.ong.findAll();
  ctx.body = ongs;
});

module.exports = router;
