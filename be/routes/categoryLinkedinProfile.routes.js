const { createCategoryLinkedinProfile, categoryLinkedinProfile, categoryLinkedinProfiles, updateCategoryLinkedinProfile, deleteCategoryLinkedinProfile } = require('../controllers/categoryLinkedinProfile.controllers');

const router = require('express').Router();

router.post('/', createCategoryLinkedinProfile);
router.get('/', categoryLinkedinProfiles);
router.get('/:id', categoryLinkedinProfile);
router.put('/:id', updateCategoryLinkedinProfile);
router.delete('/:id', deleteCategoryLinkedinProfile);

module.exports = router;
