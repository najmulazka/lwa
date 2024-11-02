const router = require('express').Router();
const { googleOauth2 } = require('../controllers/auth.controllers');
const passport = require('../libs/passport.libs');

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