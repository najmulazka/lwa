const prisma = require('../libs/prisma.libs');

module.exports = {
  createCategoryLinkedinProfile: async (req, res, next) => {
    try {
      const { name } = req.body;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({
        where: {
          name,
        },
      });

      if (existCategoryLinkedinProfile) {
        return res.sendResponse(400, 'Bad Request', 'Category Name Already', null);
      }

      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.create({
        data: {
          name,
        },
      });

      res.sendResponse(201, 'Created', null, categoryLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  categoryLinkedinProfiles: async (req, res, next) => {
    try {
      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.findMany({ orderBy: { id: 'asc' } });

      res.sendResponse(200, 'Get All Category Linkedin Profile Successfull', null, categoryLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  categoryLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({ where: { id: Number(id) } });

      if (!existCategoryLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'Get Category Linkedin Profile Successfull', null, existCategoryLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  updateCategoryLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({ where: { id: Number(id) } });

      if (!existCategoryLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });

      res.sendResponse(200, 'Update Linkedin Profile Successfull', null, categoryLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  deleteCategoryLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({ where: { id: Number(id) } });

      if (!existCategoryLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.categoryLinkedinProfile.delete({
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
