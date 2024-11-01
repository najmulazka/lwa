const router = require('express').Router();
const { createTestimoni, testimonials, updateTestimoni, deleteTestimoni } = require('../controllers/testimonials.controllers');

router.post('/', createTestimoni);
router.get('/', testimonials);
router.put('/:id', updateTestimoni);
router.delete('/:id', deleteTestimoni);

module.exports = router;
