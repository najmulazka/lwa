const { selfCheckLinkedinProfile, updateSelfCheckLinkedinProfile } = require('../controllers/selfCheckLinkedinProfile');
const { restrict } = require('../middlewares/restrict.middlewares');

const router = require('express').Router();

router.get('/', restrict, selfCheckLinkedinProfile);
router.put('/:id', restrict, updateSelfCheckLinkedinProfile);

module.exports = router;
