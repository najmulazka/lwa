const prisma = require('../libs/prisma.libs');

module.exports = {
  selfCheckLandingJobs: async (req, res, next) => {
    try {
      const selfCheckLandingJobs = await prisma.selfCheckLandingJob.findMany();

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

      data = JSON.parse(data);

      const selfCheckLandingJobs = await Promise.all(
        data.map((item) =>
          prisma.selfCheckLandingJob.update({
            where: {
              taskId: item.taskId,
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
        data: selfCheckLandingJobs,
      });
    } catch (err) {
      next(err);
    }
  },
};
