const Router = require('express');

const router = new Router();
const panelController = require('../controllers/panelController');

router.get('/panel', panelController.get);

module.exports = router;
