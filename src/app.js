const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const mailer = require('./mailers');
const mount = require('koa-mount');
const render = require('koa-ejs');
const session = require('koa-session');
const apiApp = require('./api-app');
const uiApp = require('./ui-app');
const orm = require('./models');

const app = new Koa();

const developmentMode = app.env === 'development';

app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

// expose a session hash to store information across requests from same client
app.use(session({
  maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
}, app));

mailer(apiApp);
mailer(uiApp);

// Configure EJS views
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

app.use(mount('/api', apiApp));
app.use(mount(uiApp));

module.exports = app;
