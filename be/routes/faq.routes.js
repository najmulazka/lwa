const router = require('express').Router();
const { createFaq, faq, updateFaq, deleteFaq, faqDetail } = require('../controllers/faq.controllers');
const { restrictAdmin } = require('../middlewares/restrict.middlewares');

router.post('/', restrictAdmin, createFaq);
router.get('/', faq);
router.get('/:id', faqDetail);
router.put('/:id', restrictAdmin, updateFaq);
router.delete('/:id', restrictAdmin, deleteFaq);

module.exports = router;
