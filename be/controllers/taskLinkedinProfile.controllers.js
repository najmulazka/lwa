const prisma = require('../libs/prisma.libs');

module.exports = {
  createTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { categoryId, description } = req.body;
      const taskLinkedinProfile = await prisma.taskLinkedinProfile.create({
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      res.sendResponse(201, 'Created', null, taskLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  taskLinkedinProfiles: async (req, res, next) => {
    try {
      let { categoryId } = req.query;
      let where = {};
      if (categoryId) {
        where.categoryId = Number(categoryId);
      }

      let taskLinkedinProfile = await prisma.taskLinkedinProfile.findMany({
        where,
        include: {
          categoryLinkedinProfile: true,
        },
        orderBy: {
          categoryId: 'asc',
        },
      });

      res.sendResponse(200, 'Get All Task Linkedin Profile Successfull', null, taskLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  taskLinkedinProfileDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let taskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
        include: {
          categoryLinkedinProfile: true,
        },
      });

      if (!taskLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'Get Task Linkedin Profile Successfull', null, taskLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  updateTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { categoryId, description } = req.body;

      const existTaskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      let taskLinkedinProfile = await prisma.taskLinkedinProfile.update({
        where: { id: Number(id) },
        data: {
          categoryId: Number(categoryId),
          description,
        },
      });

      if (!taskLinkedinProfile) {
        return res.sendResponse(400, 'Bad Request', 'Can not update', null);
      }

      res.sendResponse(200, 'Update Task Linkedin Profile Sucessfull', null, taskLinkedinProfile);
    } catch (err) {
      next(err);
    }
  },

  deleteTaskLinkedinProfile: async (req, res, next) => {
    try {
      const { id } = req.params;

      const existTaskLinkedinProfile = await prisma.taskLinkedinProfile.findUnique({
        where: { id: Number(id) },
      });

      if (!existTaskLinkedinProfile) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.taskLinkedinProfile.delete({
        where: { id: Number(id) },
      });

      return res.sendResponse(204, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
