const router = require('express').Router();
const { createTaskLinkedinProfile, taskLinkedinProfiles, taskLinkedinProfileDetail, updateTaskLinkedinProfile, deleteTaskLinkedinProfile } = require('../controllers/taskLinkedinProfile.controllers');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.post('/', restrictAdmin, createTaskLinkedinProfile);
router.get('/', restrict, taskLinkedinProfiles);
router.get('/:id', restrict, taskLinkedinProfileDetail);
router.put('/:id', restrictAdmin, updateTaskLinkedinProfile);
router.delete('/:id', restrictAdmin, deleteTaskLinkedinProfile);

module.exports = router;
