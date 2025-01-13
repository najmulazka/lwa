const prisma = require('../libs/prisma.libs');

module.exports = {
  createCategoryLandingJob: async (req, res, next) => {
    try {
      const { name } = req.body;

      const existCategoryLandingJob = await prisma.categoryLandingJob.findUnique({
        where: {
          name,
        },
      });

      if (existCategoryLandingJob) {
        return res.sendResponse(400, 'Bad Request', 'Category Name Already', null);
      }

      const categoryLandingJob = await prisma.categoryLandingJob.create({
        data: {
          name,
        },
      });

      res.sendResponse(201, 'Created', categoryLandingJob, null);
    } catch (err) {
      next(err);
    }
  },

  categoryLandingJobs: async (req, res, next) => {
    try {
      const categoryLandingJob = await prisma.categoryLandingJob.findMany({ orderBy: { id: 'asc' } });

      res.sendResponse(200, 'Get All Task Landing Job Successfull', null, categoryLandingJob);
    } catch (err) {
      next(err);
    }
  },

  categoryLandingJobDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLandingJob = await prisma.categoryLandingJob.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!existCategoryLandingJob) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'OK', 'Get Detail Task Landing Job Successfull', existCategoryLandingJob);
    } catch (err) {
      next(err);
    }
  },

  updateCategoryLandingJob: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const existCategoryLandingJob = await prisma.categoryLandingJob.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!existCategoryLandingJob) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      const categoryLandingJob = await prisma.categoryLandingJob.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });

      return res.sendResponse(200, 'Update Task Landing Job Successfull', null, categoryLandingJob);
    } catch (err) {
      next(err);
    }
  },

  deleteCategoryLandingJob: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLandingJob = await prisma.categoryLandingJob.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!existCategoryLandingJob) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.categoryLandingJob.delete({
        where: {
          id: Number(id),
        },
      });

      res.sendResponse(204, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
