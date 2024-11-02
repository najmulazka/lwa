const jwt = require('jsonwebtoken');
const prisma = require('../libs/prisma.libs');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  loginAdmin: async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await prisma.users.findUnique({ where: { email } });

    if (!existUser || !existUser.isAdmin) {
      return res.status(400).json({
        status: false,
        message: 'Email Or Password Wrong',
        data: null,
      });
    }

    if (password !== existUser.password) {
      return res.status(400).json({
        status: false,
        message: 'Email Or Password Wrong',
        data: null,
      });
    }

    const token = jwt.sign({ email: existUser.email }, JWT_SECRET_KEY);

    res.status(200).json({
      status: true,
      message: 'OK',
      err: null,
      data: { existUser, token },
    });
  },

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
