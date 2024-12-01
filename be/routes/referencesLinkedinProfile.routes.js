const router = require('express').Router();
const { image } = require('../libs/multer.libs');
const { createReferences, getReferences, updateReferences } = require('../controllers/referencesLinkedinProfile.controllers');

router.post('/', image.array('image', 10), createReferences);
router.get('/', getReferences);
router.put('/', image.array('image', 10), updateReferences);

module.exports = router;
