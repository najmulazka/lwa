const prisma = require('../libs/prisma.libs');

module.exports = {
  createTaskLandingJob: async (req, res, next) => {
    try {
      const { taskName, description } = req.body;
      const taskLandingJob = await prisma.taskLandingJob.create({
        data: {
          taskName,
          description,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: taskLandingJob,
      });
    } catch (err) {
      next(err);
    }
  },

  taskLandingJobs: async (req, res, next) => {
    try {
      let taskLandingJobs = await prisma.taskLandingJob.findMany();

      res.status(200).json({
        status: true,
        message: 'Get All Task Landing Job Successfull',
        data: taskLandingJobs,
      });
    } catch (err) {
      next(err);
    }
  },

  taskLandingJobDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let taskLandingJob = await prisma.taskLandingJob.findUnique({ where: { id: Number(id) } });

      if (!taskLandingJob) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Task Landing Job Successfull',
        data: taskLandingJob,
      });
    } catch (err) {
      next(err);
    }
  },

  updateTaskLandingJob: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { taskName, description } = req.body;

      const existTaskLandingJob = await prisma.taskLandingJob.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLandingJob) {
        return res.status(400).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      let taskLandingJob = await prisma.taskLandingJob.update({
        where: { id: Number(id) },
        data: {
          taskName: taskName || existTaskLandingJob.taskName,
          description: description || existTaskLandingJob.description,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Update Task Landing Job Sucessfull',
        data: taskLandingJob,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteTaskLandingJob: async (req, res, next) => {
    try {
      const { id } = req.params;

      const existTaskLandingJob = await prisma.taskLandingJob.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLandingJob) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.taskLandingJob.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        status: true,
        message: 'Deleted',
        data: null,
      });
    } catch (err) {
      next(err);
    }
  },
};
