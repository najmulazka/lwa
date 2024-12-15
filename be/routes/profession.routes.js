const router = require('express').Router();
const { professions } = require('../controllers/profession.controllers');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.get('/', professions);

module.exports = router;
