const prisma = require('../libs/prisma.libs');

module.exports = {
  selfCheckLinkedinProfile: async (req, res, next) => {
    let { categoryId } = req.query;
    let where = {
      userId: req.user.id,
      ...(categoryId && {
        taskLinkedinProfile: {
          categoryId: Number(categoryId),
        },
      }),
    };
    try {
      const selfCheckLinkedinProfile = await prisma.selfCheckLinkedinProfile.findMany({
        where,
        include: {
          users: true,
          taskLinkedinProfile: {
            include: {
              categoryLinkedinProfile: true,
            },
          },
        },
        orderBy: [
          {
            taskLinkedinProfile: {
              categoryLinkedinProfile: {
                id: 'asc',
              },
            },
          },
          {
            taskLinkedinProfile: {
              id: 'asc',
            },
          },
        ],
      });

      res.sendResponse(200, 'Get All Self Check Landing Job Successfull', null, selfCheckLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  updateSelfCheckLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const selfCheckLinkedinProfile = await prisma.selfCheckLinkedinProfile.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
        },
      });

      res.sendResponse(200, 'Update Self Check Landing Jobs Successfull', null, selfCheckLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },
};
