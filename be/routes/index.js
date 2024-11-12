const router = require('express').Router();
const testimonials = require('./testimonials.routes');
const faq = require('./faq.routes');
const booking = require('./booking.routes');
const auth = require('./auth.routes');
const categoryLandingJob = require('./categoryLandingJob.routes');
const taskLandingJob = require('./taskLandingJob.routes');
const categoryLinkedinProfile = require('./categoryLinkedinProfile.routes');
const selfCheckLandingJob = require('./selfCheckLandingJob.routes');

router.use('/testimoni', testimonials);
router.use('/faq', faq);
router.use('/booking', booking);
router.use('/auth', auth);
router.use('/category-landing-job', categoryLandingJob);
router.use('/task-landing-job', taskLandingJob);
router.use('/category-linkedin', categoryLinkedinProfile);
router.use('/self-check-landing-job', selfCheckLandingJob);

module.exports = router;
