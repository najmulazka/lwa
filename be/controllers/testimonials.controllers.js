const prisma = require('../libs/prisma.libs');

module.exports = {
  createTestimoni: async (req, res, next) => {
    try {
      const { name, image, position, description } = req.body;
      let testimoni = await prisma.testimonials.create({
        name,
        image,
        position,
        description,
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: testimoni,
      });
    } catch (err) {
      next(err);
    }
  },

  testimonials: async (req, res, next) => {
    try {
      let testimonials = await prisma.testimonials.findMany();

      res.status(200).json({
        status: true,
        message: 'Get All Testimonials Successfull',
        data: testimonials,
      });
    } catch (err) {
      next(err);
    }
  },

  testimoniDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let testimoni = await prisma.testimonials.findUnique({ where: { id: Number(id) } });

      if (!testimoni) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Testimoni Successfull',
        data: testimoni,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
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

      res.status(200).json({
        status: true,
        message: 'Update Testimoni Sucessfull',
        data: testimoni,
      });
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
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.testimonials.delete({
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
