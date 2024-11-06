const prisma = require('../libs/prisma.libs');

module.exports = {
  selfCheckLandingJobs: async (req, res, next) => {
    try {
      const selfCheckLandingJobs = await prisma.selfCheckLandingJob.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          users: true,
          taskLandingJob: true,
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
      const { data } = req.body;

      const selfCheckLandingJobs = await Promise.all(
        data.map((item) =>
          prisma.selfCheckLandingJob.updateMany({
            where: {
              taskId: Number(item.taskId),
              userId: req.user.id,
            },
            data: {
              status: item.status,
            },
          })
        )
      );

      res.status(200).json({
        status: true,
        message: 'Update Self Check Landing Jobs Successfull',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
};
