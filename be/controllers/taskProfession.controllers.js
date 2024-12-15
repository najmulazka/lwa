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

      res.status(200).json({
        status: true,
        message: 'Get All Task Linkedin Profile Successfull',
        data: taskProfessions,
      });
    } catch (err) {
      next(err);
    }
  },
};
