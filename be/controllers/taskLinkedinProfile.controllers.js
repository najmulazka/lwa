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

      res.status(201).json({
        status: true,
        message: 'Created',
        data: taskLinkedinProfile,
      });
    } catch (err) {
      next(err);
    }
  },

  taskLinkedinProfiles: async (req, res, next) => {
    try {
      let taskLinkedinProfile = await prisma.taskLinkedinProfile.findMany({
        include: {
          categoryLinkedinProfile: true,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Get All Task Landing Job Successfull',
        data: taskLinkedinProfile,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Task Landing Job Successfull',
        data: taskLinkedinProfile,
      });
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
        return res.status(400).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      let taskLinkedinProfile = await prisma.taskLinkedinProfile.update({
        where: { id: Number(id) },
        data: {
          categoryId: categoryId || existTaskLinkedinProfile.categoryId,
          description: description || existTaskLinkedinProfile.description,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Update Task Landing Job Sucessfull',
        data: taskLinkedinProfile,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.taskLinkedinProfile.delete({
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
