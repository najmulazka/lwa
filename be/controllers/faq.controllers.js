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

      res.sendResponse(201, 'Created', null, faq);
    } catch (err) {
      next(err);
    }
  },

  faq: async (req, res, next) => {
    try {
      let faq = await prisma.faq.findMany();

      res.sendResponse(200, 'Get All Faq Successfull', null, faq);
    } catch (err) {
      next(err);
    }
  },

  faqDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      let faq = await prisma.faq.findUnique({ where: { id: Number(id) } });

      if (!faq) {
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      res.sendResponse(200, 'Get Faq Successful', null, faq);
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
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      let faq = await prisma.faq.update({
        where: { id: Number(id) },
        data: {
          question: question || existFaq.question,
          description: description || existFaq.description,
        },
      });

      res.sendResponse(200, 'Update Faq Successful', null, faq);
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
        return res.sendResponse(404, 'Bad Request', 'Resource Not Found', null);
      }

      await prisma.faq.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(204, 'Deleted', null, null);
    } catch (err) {
      next(err);
    }
  },
};
