const router = require('express').Router();
const { getAllBooking } = require('../controllers/booking.controllers');
const { restrictAdmin } = require('../middlewares/restrict.middlewares');

router.get('/', restrictAdmin, getAllBooking);

module.exports = router;
