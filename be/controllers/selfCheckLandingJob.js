const prisma = require('../libs/prisma.libs');

module.exports = {
  selfCheckLandingJobs: async (req, res, next) => {
    let { categoryId } = req.query;
    let where = {
      userId: req.user.id,
      ...(categoryId && {
        taskLandingJob: {
          categoryId: Number(categoryId),
        },
      }),
    };
    try {
      const selfCheckLandingJobs = await prisma.selfCheckLandingJob.findMany({
        where,
        include: {
          users: true,
          taskLandingJob: {
            include: {
              categoryLandingJob: true,
            },
          },
        },
        orderBy: {
          taskLandingJob: {
            categoryId: 'asc',
          },
        },
      });

      res.status(200).json({
        status: true,
        message: 'Get All Self Check Landing Job Successfull',
        data: selfCheckLandingJobs,
      });
    } catch (err) {
      next(err);
    }
  },

  updateSelfCheckLandingJob: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const selfCheckLandingJob = await prisma.selfCheckLandingJob.update({
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
        data: selfCheckLandingJob,
      });
    } catch (err) {
      next(err);
    }
  },
};
