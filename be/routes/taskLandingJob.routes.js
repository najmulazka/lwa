const router = require('express').Router();
const { createTaskLandingJob, taskLandingJobs, taskLandingJobDetail, updateTaskLandingJob, deleteTaskLandingJob } = require('../controllers/taskLandingJob.controllers');

router.post('/', createTaskLandingJob);
router.get('/', taskLandingJobs);
router.get('/:id', taskLandingJobDetail);
router.put('/:id', updateTaskLandingJob);
router.delete('/:id', deleteTaskLandingJob);

module.exports = router;
