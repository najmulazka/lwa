const router = require('express').Router();
const { googleOauth2, loginAdmin, whoami } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.libs');
const { restrictAdmin, restrict } = require('../middlewares/restrict.middlewares');

router.post('/login', loginAdmin);
router.get('/whoami', restrictAdmin, whoami);
router.get('/user', restrict, whoami);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/v1/auth/google',
  }),
  googleOauth2
);

module.exports = router;
