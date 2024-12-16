const router = require('express').Router();
const { taskprofessions } = require('../controllers/taskProfession.controllers');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.get('/', restrict, taskprofessions);

module.exports = router;
