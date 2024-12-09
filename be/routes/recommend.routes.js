const router = require('express').Router();
const { recommend } = require('../controllers/profession.controllers');
const { restrict } = require('../middlewares/restrict.middlewares');

router.post('/', restrict, recommend);

module.exports = router;
