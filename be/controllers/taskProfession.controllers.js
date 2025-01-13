const prisma = require('../libs/prisma.libs');

module.exports = {
  taskprofessions: async (req, res, next) => {
    try {
      let taskProfessions = await prisma.taskProfessions.findMany({
        include: {
          professions: true,
        },
        orderBy: {
          professionId: 'asc',
        },
      });

      res.sendResponse(200, 'Get All Task Linkedin Profile Successful', null, taskProfessions);
    } catch (err) {
      next(err);
    }
  },
};
