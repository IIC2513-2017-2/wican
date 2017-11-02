const KoaRouter = require('koa-router');
const ongsRoutes = require('./ongs');

const router = new KoaRouter();

router.use('/ongs', ongsRoutes.routes());

module.exports = router;
