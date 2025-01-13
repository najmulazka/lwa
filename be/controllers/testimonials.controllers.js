const prisma = require('../libs/prisma.libs');

module.exports = {
  createTestimoni: async (req, res, next) => {
    try {
      const { name, image, position, description } = req.body;
      let testimoni = await prisma.testimonials.create({
        data: {
          name,
          image,
          position,
          description,
        },
      });

      res.sendResponse(201, 'Created', null, testimoni);
    } catch (err) {
      next(err);
    }
  },

  testimonials: async (req, res, next) => {
    try {
      let testimonials = await prisma.testimonials.findMany();

      res.sendResponse(200, 'Get All Testimonials Successful', null, testimonials);
    } catch (err) {
      next(err);
    }
  },

  testimoniDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let testimoni = await prisma.testimonials.findUnique({ where: { id: Number(id) } });

      if (!testimoni) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'Get Testimoni Successfull', null, testimoni);
    } catch (err) {
      next(err);
    }
  },

  updateTestimoni: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, image, position, description } = req.body;

      const existTestimoni = await prisma.testimonials.findUnique({
        where: { id: Number(id) },
      });

      if (!existTestimoni) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      let testimoni = await prisma.testimonials.update({
        where: { id: Number(id) },
        data: {
          name: name || existTestimoni.name,
          image: image || existTestimoni.image,
          position: position || existTestimoni.position,
          description: description || existTestimoni.description,
        },
      });

      res.sendResponse(200, 'Update Testimoni Sucessfull', null, testimoni);
    } catch (err) {
      next(err);
    }
  },

  deleteTestimoni: async (req, res, next) => {
    try {
      const { id } = req.params;

      const existTestimoni = await prisma.testimonials.findUnique({
        where: { id: Number(id) },
      });

      if (!existTestimoni) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.testimonials.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
