const router = require('express').Router();
const { predict } = require('../controllers/mlModel.Controllers');

router.post('/', predict);

module.exports = router;
