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
        return res.sendResponse(400, 'Bad Request', 'Error selected category', null);
      }

      const taskLandingJob = await prisma.taskLandingJob.create({
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      res.sendResponse(201, 'Created', null, taskLandingJob);
    } catch (err) {
      next(err);
    }
  },

  taskLandingJobs: async (req, res, next) => {
    try {
      let { categoryId } = req.query;
      let where = {};
      if (categoryId) {
        where.categoryId = Number(categoryId);
      }

      let taskLandingJobs = await prisma.taskLandingJob.findMany({
        where,
        include: {
          categoryLandingJob: true,
        },
        orderBy: {
          categoryId: 'asc',
        },
      });

      res.sendResponse(200, 'Get All Task Landing Job Successfull', null, taskLandingJobs);
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
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'Get Task Landing Job Successfull', null, taskLandingJob);
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
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      let taskLandingJob = await prisma.taskLandingJob.update({
        where: { id: Number(id) },
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      if (!taskLandingJob) {
        return res.sendResponse(400, 'Bad Request', 'Can not updated', null);
      }

      res.sendResponse(200, 'Update Task Landing Job Sucessfull', null, taskLandingJob);
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
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.taskLandingJob.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(204, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
