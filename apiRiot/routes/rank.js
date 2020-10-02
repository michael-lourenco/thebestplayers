const router = require('express').Router();
const controller = require('../controllers/rank');

router.get('/', controller.get);
router.post('/', controller.post);
router.get('/:_id', controller.get);

module.exports = router;