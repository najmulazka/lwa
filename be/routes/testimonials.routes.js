const router = require('express').Router();
const { createTestimoni, testimonials, updateTestimoni, deleteTestimoni, testimoniDetail } = require('../controllers/testimonials.controllers');
const { restrictAdmin } = require('../middlewares/restrict.middlewares');

router.post('/', restrictAdmin, createTestimoni);
router.get('/',restrictAdmin, testimonials);
router.get('/:id', testimoniDetail);
router.put('/:id', restrictAdmin, updateTestimoni);
router.delete('/:id', restrictAdmin, deleteTestimoni);

module.exports = router;
