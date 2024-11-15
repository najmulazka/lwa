const prisma = require('../libs/prisma.libs');

module.exports = {
  selfCheckLinkedinProfile: async (req, res, next) => {
    try {
      const selfCheckLinkedinProfile = await prisma.selfCheckLinkedinProfile.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          users: true,
          taskLinkedinProfile: {
            include: {
              categoryLinkedinProfile: true,
            },
          },
        },
      });

      res.status(200).json({
        status: true,
        message: 'Get All Self Check Landing Job Successfull',
        data: selfCheckLinkedinProfile,
      });
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

      res.status(200).json({
        status: true,
        message: 'Update Self Check Landing Jobs Successfull',
        data: selfCheckLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },
};
