const prisma = require('../libs/prisma.libs');
// const OpenAI = require('openai');
// const { OPENAI_API_KEY } = process.env;

// const client = new OpenAI({
//   apiKey: OPENAI_API_KEY,
// });

module.exports = {
  recommend: async (req, res) => {
    const { profession } = req.body;
    let recommends = [];

    let points =
      'Pelajari dasar-dasar statistik dan probabilitas.js. Kuasai bahasa pemrograman Python atau R. Pelajari penggunaan pustaka data science seperti Pandas, NumPy, dan Matplotlib. Kuasai teknik machine learning seperti regresi, klasifikasi, dan clustering. Pelajari deep learning dan penggunaan framework seperti TensorFlow atau PyTorch. Pahami cara bekerja dengan data besar (big data) dan alat seperti Hadoop atau Spark. Pelajari SQL untuk manajemen database. Latih kemampuan visualisasi data menggunakan alat seperti Tableau atau Power BI. Kembangkan kemampuan untuk membersihkan dan memanipulasi data. Pahami konsep data wrangling dan eksplorasi data. Terus berlatih dengan proyek nyata dan kompetisi data science.';

    recommends = points
      .split('. ')
      .map((point) => point.trim())
      .filter((point) => point !== '');

    console.log(recommends);
    res.json(recommends);

    // const chatCompletion = await client.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: `Saya ingin menjadi seorang ${profession}. hal hal apa saja yang perlu saya lakukan dan kuasai? tampilkan dalam bentuk point point saja, jangan ada kata kata lain berikan point point itu dalam 1 paragraf dan pisahkan dengan tanda titik (.) untuk antar point`,
    //     },
    //   ],
    //   temperature: 0.5,
    //   max_tokens: 1000,
    //   // stream: true,
    //   // top_p: 1,
    // });

    // // console.log(chatCompletion);
    // // console.log('----------------------------------');
    // // if (chatCompletion.choices && chatCompletion.choices.length > 0) {
    // //   console.log(chatCompletion.choices[0].message.content);
    // // } else {
    // //   console.error('Choices tidak ditemukan atau kosong.');
    // // }

    // if (chatCompletion.choices && chatCompletion.choices.length > 0) {
    //   let points = chatCompletion.choices[0].message.content;
    //   points
    //     .split('. ')
    //     .map((point) => point.trim())
    //     .filter((point) => point !== '');
    //   res.json(chatCompletion.choices[0].message.content);
    // } else {
    //   res.json('Choices tidak ditemukan atau kosong.');
    // }
  },
};
