const path = require('path');
const Koa = require('koa');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const override = require('koa-override-method');
const routes = require('./routes');

// App constructor
const app = new Koa();

const developmentMode = app.env === 'development';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

// webpack middleware for dev mode only
if (developmentMode) {
  /* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
  app.use(require('koa-webpack')({ // eslint-disable-line global-require
    dev: {
      index: 'index.html',
      stats: {
        colors: true,
      },
    },
    hot: false,
  }));
}

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));

// flash messages support
app.use(koaFlashMessage);

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body);
  return next();
});

// general handling for errors tha reach to this point
app.use(async (ctx, next) => {
  try {
    // let middlewares handle the request, but catch possible errors thrown
    await next();
  } catch (error) {
    // we'll only handle Not found HTTP errors in this case
    if (error.name === 'NotFoundError') {
      // and we'll use a custom template instead of default handling
      await ctx.render('error', {
        title: error.message,
        details: `El recurso de id ${error.id} no fue encontrado`,
      });
      // if we'll handle the error we should emit the 'error' event so a handling of that
      // (usually for logging purposes) can also know about this error
      ctx.app.emit('error', error, ctx);
    }
    // if it's an error we are not handling we need to throw it so next handlers
    // (or the default one) have the opportunity to handle it
    throw error;
  }
});

// Routing middleware
app.use(routes.routes());

// 'error' event will be emitted for every error. We cannot respond to the client from here since
// this happens after the response has been generated
// app.on('error', (error, ctx) => {
//   console.error(error, ctx);
// });

module.exports = app;
