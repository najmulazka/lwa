const router = require('express').Router();
const { recommend } = require('../controllers/recommend.controllers');

router.post('/', recommend);

module.exports = router;
