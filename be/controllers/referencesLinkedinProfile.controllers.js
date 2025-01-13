const prisma = require('../libs/prisma.libs');
const imagekit = require('../libs/imagekit.libs');
const path = require('path');
const { json } = require('express');

module.exports = {
  createReferences: async (req, res, next) => {
    try {
      if (!req.files) {
        res.sendResponse(400, 'Bad Request', 'File is required', null);
      }

      const images = await Promise.all(
        req.files.map(async (file) => {
          let strFile = file.buffer.toString('base64');
          const { url, fileId } = await imagekit.upload({
            fileName: Date.now() + path.extname(file.originalname),
            file: strFile,
          });
          return { imageUrl: url, fileId };
        })
      );

      await prisma.referencesLinkedinProfile.createMany({
        data: images,
        skipDuplicates: true,
      });

      res.sendResponse(201, 'Created', null, images);
    } catch (err) {
      next(err);
    }
  },

  getReferences: async (req, res, next) => {
    try {
      let references = await prisma.referencesLinkedinProfile.findMany();

      res.sendResponse(200, 'Get All References Successful', null, references);
    } catch (err) {
      next(err);
    }
  },

  updateReferences: async (req, res, next) => {
    try {
      if (!req.files) {
        return res.sendResponse(200, 'Bad Request', 'File is required', null);
      }

      const images = await Promise.all(
        req.files.map(async (file) => {
          let strFile = file.buffer.toString('base64');
          const { url, fileId } = await imagekit.upload({
            fileName: Date.now() + path.extname(file.originalname),
            file: strFile,
          });
          return { imageUrl: url, fileId };
        })
      );

      const references = await prisma.referencesLinkedinProfile.findMany();
      for (const reference of references) {
        await imagekit.deleteFile(reference.fileId);
      }

      const del = await prisma.referencesLinkedinProfile.deleteMany();
      if (!del) {
        return res.sendResponse(400, 'Bad Request', 'Can not deleted', null);
      }

      const cre = await prisma.referencesLinkedinProfile.createMany({
        data: images,
        skipDuplicates: true,
      });
      if (!cre) {
        return res.sendResponse(400, 'Bad Request', 'Can not update', null);
      }

      res.sendResponse(200, 'Created', null, images);
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  },
};
