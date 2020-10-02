const router = require('express').Router();

const controller = require('../controllers/index');
const controllerChampion = require('../controllers/champion');
const rank = require('./rank')

router.use('/rank', rank);
router.use('/champion', controllerChampion.get);
router.use('/', controller.get);

module.exports = router;