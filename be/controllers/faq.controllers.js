const prisma = require('../libs/prisma.libs');

module.exports = {
  createFaq: async (req, res, next) => {
    try {
      const { question, description } = req.body;
      let faq = await prisma.faq.create({
        data: {
          question,
          description,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Created',
        data: faq,
      });
    } catch (err) {
      next(err);
    }
  },

  faq: async (req, res, next) => {
    try {
      let faq = await prisma.faq.findMany();

      res.status(200).json({
        status: true,
        message: 'Get All Faq Successfull',
        data: faq,
      });
    } catch (err) {
      next(err);
    }
  },

  faqDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let faq = await prisma.faq.findUnique({ where: { id: Number(id) } });

      if (!faq) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Get Faq Successfull',
        data: faq,
      });
    } catch (err) {
      next(err);
    }
  },

  updateFaq: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { question, description } = req.body;

      const existFaq = await prisma.faq.findUnique({
        where: { id: Number(id) },
      });

      if (!existFaq) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      let faq = await prisma.faq.update({
        where: { id: Number(id) },
        data: {
          question: question || existFaq.question,
          description: description || existFaq.description,
        },
      });

      res.status(200).json({
        status: true,
        message: 'Update Faq Sucessfull',
        data: faq,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteFaq: async (req, res, next) => {
    try {
      const { id } = req.params;

      const existFaq = await prisma.faq.findUnique({
        where: { id: Number(id) },
      });

      if (!existFaq) {
        return res.status(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      await prisma.faq.delete({
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
