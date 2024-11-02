const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  googleOauth2: async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY);

    let path = `${req.protocol}://${req.get('host')}`;
    res.status(200).json({
      status: true,
      message: 'OK',
      err: null,
      data: { user: req.user, token },
    });
  },
};
