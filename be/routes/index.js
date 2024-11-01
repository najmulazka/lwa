const router = require('express').Router();
const testimonials = require('./testimonials.routes');

router.use('/testimoni', testimonials);

module.exports = router;
