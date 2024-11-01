const router = require('express').Router();
const { createFaq, faq, updateFaq, deleteFaq } = require('../controllers/faq.controllers');

router.post('/', createFaq);
router.get('/', faq);
router.put('/:id', updateFaq);
router.delete('/:id', deleteFaq);

module.exports = router;
