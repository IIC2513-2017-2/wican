const Koa = require('koa');
const koaLogger = require('koa-logger');
const path = require('path');
const render = require('koa-ejs');
const routes = require('./routes');
const orm = require('./models');

// App constructor
const app = new Koa();

const developmentMode = app.env === 'development';

app.use(koaLogger());

// expose ORM in context
app.use((ctx, next) => {
  if (!ctx.orm) {
    ctx.orm = orm;
  }
  return next();
});

// Configure EJS views
render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'html.ejs',
  cache: !developmentMode,
});

// Routing middleware
app.use(routes.routes());

module.exports = app;
