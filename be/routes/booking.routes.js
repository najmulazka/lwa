const router = require('express').Router();
const { getAllBooking } = require('../controllers/booking.controllers');

router.get('/', getAllBooking);

module.exports = router;
