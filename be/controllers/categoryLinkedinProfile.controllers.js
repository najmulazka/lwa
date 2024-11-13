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
        return res.status(400).json({
          status: false,
          message: 'Category Name Already',
          data: null,
        });
      }

      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.create({
        data: {
          name,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: categoryLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  categoryLinkedinProfiles: async (req, res, next) => {
    try {
      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.findMany();

      res.status(200).json({
        status: true,
        message: 'Get All Category Linkedin Profile Successfull',
        data: categoryLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  categoryLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({ where: { id: Number(id) } });

      if (!existCategoryLinkedinProfile) {
        return res.json(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Category Linkedin Profile Successfull',
        data: existCategoryLinkedinProfile,
      });
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
        return res.json(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Update Linkedin Profile Successfull',
        data: categoryLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteCategoryLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const existCategoryLinkedinProfile = await prisma.categoryLinkedinProfile.findUnique({ where: { id: Number(id) } });

      if (!existCategoryLinkedinProfile) {
        return res.json(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      const categoryLinkedinProfile = await prisma.categoryLinkedinProfile.delete({
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
