const { selfCheckLandingJobs, updateSelfCheckLandingJob } = require('../controllers/selfCheckLandingJob');
const { restrict } = require('../middlewares/restrict.middlewares');

const router = require('express').Router();

router.get('/', restrict, selfCheckLandingJobs);
router.put('/:id', restrict, updateSelfCheckLandingJob);

module.exports = router;
