const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('sessionNew', '/new', async ctx =>
  ctx.render('session/new', {
    createSessionPath: ctx.router.url('sessionCreate'),
    notice: ctx.flashMessage.notice,
  }),
);

router.put('sessionCreate', '/', async (ctx) => {
  console.log('Signing in...');
  ctx.redirect(ctx.router.url('sessionNew'));
});

module.exports = router;
