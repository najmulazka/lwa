const prisma = require('../libs/prisma.libs');
const imagekit = require('../libs/imagekit.libs');
const path = require('path');
const { json } = require('express');

module.exports = {
  createReferences: async (req, res, next) => {
    try {
      if (!req.files) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
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

      res.status(202).json({
        status: true,
        message: 'Created',
        data: images,
      });
    } catch (err) {
      next(err);
    }
  },

  getReferences: async (req, res, next) => {
    try {
      let references = await prisma.referencesLinkedinProfile.findMany();

      res.status(202).json({
        status: true,
        message: 'Get All Referencess Successfull',
        data: references,
      });
    } catch (err) {
      next(err);
    }
  },

  updateReferences: async (req, res, next) => {
    try {
      if (!req.files) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
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
        return res.status(404).json({
          status: false,
          message: 'dont delete',
          data: null,
        });
      }

      const cre = await prisma.referencesLinkedinProfile.createMany({
        data: images,
        skipDuplicates: true,
      });
      if (!cre) {
        return res.status(404).json({
          status: false,
          message: 'dont update',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Created',
        data: images,
      });
    } catch (err) {
      next(err);
    }
  },
};
