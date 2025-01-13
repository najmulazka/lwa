const jwt = require('jsonwebtoken');
const prisma = require('../libs/prisma.libs');
const { JWT_SECRET_KEY, URL } = process.env;
const bcrypt = require('bcrypt');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      let userExist = await prisma.users.findUnique({ where: { email } });
      if (userExist) {
        return res.sendResponse(400, 'Bad Request', 'user has already been used!', null);
      }

      let encryptedPassword = await bcrypt.hash(password, 10);
      let user = await prisma.users.create({
        data: {
          name,
          email,
          password: encryptedPassword,
        },
      });

      let token = jwt.sign({ email: user.email }, JWT_SECRET_KEY);
      res.sendResponse(201, 'Created', null, { name, email, password, token });
    } catch (err) {
      next(err);
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;

    const existUser = await prisma.users.findUnique({ where: { email } });
    if (!existUser) {
      return res.sendResponse(400, 'Bad Request', 'Email Or Password Wrong', null);
    }

    let isPasswordCorrect = await bcrypt.compare(password, existUser.password);
    if (!isPasswordCorrect) {
      return res.sendResponse(400, 'Bad Request', 'Email Or Password Wrong', null);
    }

    const token = jwt.sign({ id: existUser.id }, JWT_SECRET_KEY);

    try {
      const taskLandingJobs = await prisma.taskLandingJob.findMany();
      const taskLinkedinProfiles = await prisma.taskLinkedinProfile.findMany();

      const existSelfCheckLandingJob = await prisma.selfCheckLandingJob.findMany({
        where: {
          userId: existUser.id,
        },
      });

      const existingTaskLandingJobIds = new Set(existSelfCheckLandingJob.map((data) => data.taskId));
      const newTaskLandingJobToInsert = taskLandingJobs
        .filter((task) => !existingTaskLandingJobIds.has(task.id))
        .map((task) => ({
          userId: existUser.id,
          taskId: task.id,
          status: false,
        }));

      if (newTaskLandingJobToInsert.length > 0) {
        await prisma.selfCheckLandingJob.createMany({
          data: newTaskLandingJobToInsert,
        });
      }

      const existSelfCheckLinkedinProfile = await prisma.selfCheckLinkedinProfile.findMany({
        where: {
          userId: existUser.id,
        },
      });

      const existingTaskLinkedinProfileIds = new Set(existSelfCheckLinkedinProfile.map((data) => data.taskId));
      const newTaskLinkedinProfileToInsert = taskLinkedinProfiles
        .filter((task) => !existingTaskLinkedinProfileIds.has(task.id))
        .map((task) => ({
          userId: existUser.id,
          taskId: task.id,
          status: false,
        }));

      if (newTaskLinkedinProfileToInsert.length > 0) {
        await prisma.selfCheckLinkedinProfile.createMany({
          data: newTaskLinkedinProfileToInsert,
        });
      }
    } catch (err) {
      next(err);
    }

    res.sendResponse(200, 'OK', null, { existUser, token });
  },

  loginAdmin: async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await prisma.users.findUnique({ where: { email } });

    if (!existUser || !existUser.isAdmin) {
      return res.sendResponse(400, 'Bad Request', 'Email Or Password Wrong', null);
    }

    if (password !== existUser.password) {
      return res.sendResponse(400, 'Bad Request', 'Email Or Password Wrong', null);
    }

    const token = jwt.sign({ id: existUser.id }, JWT_SECRET_KEY);
    res.sendResponse(200, 'OK', null, { existUser, token });
  },

  whoami: async (req, res, next) => {
    res.sendResponse(200, 'OK', null, { user: req.user });
  },

  googleOauth2: async (req, res, next) => {
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY);

    let path = `${req.protocol}://${req.get('host')}`;

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: false,
    //   samSite: 'strict',
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    const redirectUrl = `${path}/callback?token=${token}`;
    res.redirect(redirectUrl);
    // res.status(200).json({
    //   status: true,
    //   message: 'OK',
    //   err: null,
    //   data: { user: req.user, token },
    // });
  },
};
