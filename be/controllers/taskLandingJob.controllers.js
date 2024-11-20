const prisma = require('../libs/prisma.libs');

module.exports = {
  createTaskLandingJob: async (req, res, next) => {
    try {
      const { categoryId, description } = req.body;
      const categoryLandingJob = await prisma.categoryLandingJob.findUnique({
        where: {
          id: Number(categoryId),
        },
      });

      if (!categoryLandingJob) {
        return res.status(400).json({
          status: false,
          message: 'Error selected category',
          data: null,
        });
      }

      const taskLandingJob = await prisma.taskLandingJob.create({
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: taskLandingJob,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },

  taskLandingJobs: async (req, res, next) => {
    try {
      let taskLandingJobs = await prisma.taskLandingJob.findMany({
        include: {
          categoryLandingJob: true,
        },
        orderBy: {
          categoryId: 'asc',
        },
      });

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
      let taskLandingJob = await prisma.taskLandingJob.findUnique({
        where: { id: Number(id) },
        include: {
          categoryLandingJob: true,
        },
      });

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
      const { categoryId, description } = req.body;

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

      let taskLandingJob = await prisma.taskLandingJob.update({
        where: { id: Number(id) },
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      if (!taskLandingJob) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          data: null,
        });
      }

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
