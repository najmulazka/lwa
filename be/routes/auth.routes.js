const router = require('express').Router();
const { googleOauth2, loginAdmin, whoami } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.libs');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');
const { URL } = process.env;

router.post('/login', loginAdmin);
router.get('/whoami', restrictAdmin, whoami);
router.get('/user', restrict, whoami);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${URL}/login`,
  }),
  googleOauth2
);

module.exports = router;
