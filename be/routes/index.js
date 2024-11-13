const router = require('express').Router();
const testimonials = require('./testimonials.routes');
const faq = require('./faq.routes');
const booking = require('./booking.routes');
const auth = require('./auth.routes');
const categoryLandingJob = require('./categoryLandingJob.routes');
const taskLandingJob = require('./taskLandingJob.routes');
const taskLinkedinProfile = require('./taskLinkedinProfile.routes');
const categoryLinkedinProfile = require('./categoryLinkedinProfile.routes');
const selfCheckLandingJob = require('./selfCheckLandingJob.routes');
const selfCheckLinkedinProfile = require('./selfCheckLinkedinProfile.routes');

router.use('/testimoni', testimonials);
router.use('/faq', faq);
router.use('/booking', booking);
router.use('/auth', auth);
router.use('/category-landing-job', categoryLandingJob);
router.use('/task-landing-job', taskLandingJob);
router.use('/self-check-landing-job', selfCheckLandingJob);
router.use('/category-linkedin-profile', categoryLinkedinProfile);
router.use('/task-linkedin-profile', taskLinkedinProfile);
router.use('/self-check-linkedin-profile', selfCheckLinkedinProfile);

module.exports = router;
