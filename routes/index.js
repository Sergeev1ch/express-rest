const Router = require('express');

const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');

const userRouter = require('./userRouter');
const panelRouter = require('./panelRouter');

router.use('/', userRouter);
router.use('/', authMiddleware, panelRouter);

module.exports = router;
