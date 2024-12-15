const router = require('express').Router();
const { recommend, selfCheckProfessions, updateSelfCheckProfession } = require('../controllers/selfCheckProfession.controllers');
const { restrict } = require('../middlewares/restrict.middlewares');

router.post('/', restrict, recommend);
router.get('/', restrict, selfCheckProfessions);
router.put('/:id', restrict, updateSelfCheckProfession);

module.exports = router;
