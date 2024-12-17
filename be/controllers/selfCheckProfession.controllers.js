const prisma = require('../libs/prisma.libs');
const OpenAI = require('openai');
const { OPENAI_API_KEY } = process.env;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

module.exports = {
  recommend: async (req, res) => {
    const { profession } = req.body;
    let recommends = [];

    const existProfession = await prisma.professions.findUnique({
      where: {
        name: profession,
      },
      include: {
        TaskProfessions: true,
      },
    });

    if (existProfession) {
      const taskProfessions = await prisma.taskProfessions.findMany({ where: { professionId: existProfession.id } });
      const selfCheckProfession = await prisma.selfCheckProfessions.findMany({
        where: { userId: req.user.id },
        include: {
          taskProfessions: true,
          users: true,
        },
      });

      if (selfCheckProfession.length === 0) {
        await prisma.selfCheckProfessions.createMany({
          data: taskProfessions.map((task) => ({
            userId: req.user.id,
            taskId: task.id,
            status: false,
          })),
        });
      }
      res.status(200).json({
        status: true,
        message: 'Ok',
        data: selfCheckProfession,
      });
    }

    if (!existProfession) {
      const chatCompletion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `skills to become a ${profession}. Write it in bullet points only, no other words, just write the bullet points in 1 paragraph and separate them with a period (.) between them.`,
          },
        ],
        temperature: 0.5,
        max_tokens: 1000,
        // stream: true,
        // top_p: 1,
      });

      if (chatCompletion.choices && chatCompletion.choices.length > 0) {
        let points = chatCompletion.choices[0].message.content;
        console.log(points);
        recommends = points
          .split('. ')
          .map((point) => point.trim())
          .filter((point) => point !== '');

        const newProfession = await prisma.professions.create({
          data: {
            name: profession,
          },
        });

        let data = recommends.map((description) => ({
          professionId: newProfession.id,
          description: description, // hati hati persiapan replace hapus .replace(/^[^\w\s]+|[^\w\s]+$/g, '')
        }));

        await prisma.taskProfessions.createMany({ data });

        const taskProfessions = await prisma.taskProfessions.findMany({ where: { professionId: newProfession.id } });
        const selfCheckProfession = await prisma.selfCheckProfessions.findMany({
          where: { userId: req.user.id },
          include: {
            taskProfessions: true,
            users: true,
          },
        });

        if (selfCheckProfession.length === 0) {
          await prisma.selfCheckProfessions.createMany({
            data: taskProfessions.map((task) => ({
              userId: req.user.id,
              taskId: task.id,
              status: false,
            })),
          });
        }

        res.status(201).json({
          status: true,
          message: 'Ok',
          data: selfCheckProfession,
        });
      } else {
        res.json('Choices tidak ditemukan atau kosong.');
      }
    }
  },

  selfCheckProfessions: async (req, res, next) => {
    // let { categoryId } = req.query;
    let where = {
      userId: req.user.id,
      // ...(categoryId && {
      //   taskLinkedinProfile: {
      //     categoryId: Number(categoryId),
      //   },
      // }),
    };
    try {
      const selfCheckProfessions = await prisma.selfCheckProfessions.findMany({
        where,
        include: {
          users: true,
          taskProfessions: {
            include: {
              professions: true,
            },
          },
        },
        orderBy: {
          taskProfessions: {
            id: 'asc',
          },
        },
      });

      res.status(200).json({
        status: true,
        message: 'Get All Self Check Professions Successfull',
        data: selfCheckProfessions,
      });
    } catch (err) {
      next(err);
    }
  },

  updateSelfCheckProfession: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const selfCheckProfession = await prisma.selfCheckProfessions.update({
        where: {
          id: Number(id),
        },
        data: {
          status,
        },
      });

      if (!selfCheckProfession) {
        return res.json(404).json({
          status: false,
          message: 'Not Found',
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: 'Update Self Check Profession Successfull',
        data: selfCheckProfession,
      });
    } catch (err) {
      next(err);
    }
  },
};
