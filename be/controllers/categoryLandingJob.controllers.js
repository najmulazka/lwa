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
        return res.status(400).json({
          status: false,
          message: 'Category Name Already',
          data: null,
        });
      }

      const categoryLandingJob = await prisma.categoryLandingJob.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: categoryLandingJob,
      });
    } catch (err) {
      next(err);
    }
  },

  categoryLandingJobs: async (req, res, next) => {
    try {
      const categoryLandingJob = await prisma.categoryLandingJob.findMany({ orderBy: { id: 'asc' } });

      res.status(200).json({
        status: true,
        message: 'Get All Task Landing Job Successfull',
        data: categoryLandingJob,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Detail Task Landing Job Successfull',
        data: existCategoryLandingJob,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      const categoryLandingJob = await prisma.categoryLandingJob.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Update Task Landing Job Successfull',
        data: categoryLandingJob,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.categoryLandingJob.delete({
        where: {
          id: Number(id),
        },
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
