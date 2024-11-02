const { selfCheckLandingJobs, updateSelfCheckLandingJob } = require('../controllers/selfCheckLandingJob');

const router = require('express').Router();

router.get('/', selfCheckLandingJobs);
router.put('/', updateSelfCheckLandingJob);

module.exports = router;
