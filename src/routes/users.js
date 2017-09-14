const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('usersNew', '/new', async ctx =>
  ctx.render('users/new', {
    user: ctx.orm.user.build(),
    createUserPath: ctx.router.url('usersCreate'),
  }),
);

router.post('usersCreate', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save();
    ctx.flashMessage.notice = '¡Tu cuenta de usuario está lista para comenzar a usarla!';
    ctx.redirect(ctx.router.url('sessionNew'));
  } catch (validationError) {
    await ctx.render('users/new', {
      user,
      errors: validationError.errors,
      createUserPath: ctx.router.url('usersCreate'),
    });
  }
});

module.exports = router;
