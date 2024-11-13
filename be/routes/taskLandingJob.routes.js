const router = require('express').Router();
const { createTaskLandingJob, taskLandingJobs, taskLandingJobDetail, updateTaskLandingJob, deleteTaskLandingJob } = require('../controllers/taskLandingJob.controllers');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.post('/',  createTaskLandingJob);
router.get('/',  taskLandingJobs);
router.get('/:id', restrict, taskLandingJobDetail);
router.put('/:id', restrictAdmin, updateTaskLandingJob);
router.delete('/:id', restrictAdmin, deleteTaskLandingJob);

module.exports = router;
