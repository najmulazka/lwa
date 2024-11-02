const router = require('express').Router();
const testimonials = require('./testimonials.routes');
const faq = require('./faq.routes');
const booking = require('./booking.routes');
const auth = require('./auth.routes');

router.use('/testimoni', testimonials);
router.use('/faq', faq);
router.use('/booking', booking);
router.use('/auth', auth);

module.exports = router;
