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
            content: `Saya ingin menjadi seorang ${profession}. hal hal apa saja yang perlu saya lakukan dan kuasai? tampilkan dalam bentuk point point saja, jangan ada kata kata lain berikan point point itu dalam 1 paragraf dan pisahkan dengan tanda titik (.) untuk antar point`,
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
          description,
        }));

        await prisma.taskProfessions.createMany({ data });

        //================================================================================
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
};
