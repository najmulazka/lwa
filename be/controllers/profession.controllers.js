const prisma = require('../libs/prisma.libs');

module.exports = {
  professions: async (req, res, next) => {
    try {
      const professions = await prisma.professions.findMany();

      res.status(200).json({
        status: true,
        message: 'Get All Professions Successfull',
        data: professions,
      });
    } catch (err) {
      next(err);
    }
  },
};
