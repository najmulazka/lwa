const router = require('express').Router();
const { taskprofessions } = require('../controllers/taskProfession.controllers');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.get('/', taskprofessions);

module.exports = router;
