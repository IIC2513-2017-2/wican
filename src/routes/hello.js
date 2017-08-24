const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('hello', '/', async (ctx) => {
  await ctx.render('hello/index', {
    nameUrl: name => ctx.router.url('hello.name', name),
  });
});

router.get('hello.name', '/:name', (ctx) => {
  ctx.body = { message: `Hello ${ctx.params.name}!` };
});

module.exports = router;
