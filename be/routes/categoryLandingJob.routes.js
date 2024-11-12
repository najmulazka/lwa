const router = require('express').Router();
const { createCategoryLandingJob, categoryLandingJobs, categoryLandingJobDetail, updateCategoryLandingJob, deleteCategoryLandingJob } = require('../controllers/categoryLandingJob.controllers');

router.post('/', createCategoryLandingJob);
router.get('/', categoryLandingJobs);
router.get('/:id', categoryLandingJobDetail);
router.put('/:id', updateCategoryLandingJob);
router.delete('/:id', deleteCategoryLandingJob);

module.exports = router;
