const prisma = require('../libs/prisma.libs');

module.exports = {
  professions: async (req, res, next) => {
    try {
      const professions = await prisma.professions.findMany();

      res.sendResponse(200, 'Get All Professions Successful', null, professions);
    } catch (err) {
      next(err);
    }
  },
};
