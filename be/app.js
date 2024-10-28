require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const { CALENDLY_TOKEN } = process.env;

// Middleware untuk JSON parsingg
app.use(express.json());

// Endpoint untuk mendapatkan events dari Calendly
app.get('/calendly-events', async (req, res) => {
  try {
    const response = await axios.get('https://api.calendly.com/scheduled_events', {
      headers: {
        Authorization: `Bearer ${CALENDLY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      params: {
        user: 'https://api.calendly.com/users/ed8e80b0-093b-41ef-b7f0-db73a6e84f98',
      },
    });
    const events = response.data.collection;
    // res.json(events);

    const inviteesData = [];

    // Loop melalui setiap event untuk mengambil invitees
    for (const event of events) {
      const eventUuid = event.uri.split('/').pop();

      // Mengambil data invitees untuk setiap event
      const inviteesResponse = await axios.get(`https://api.calendly.com/scheduled_events/${eventUuid}/invitees`, {
        headers: {
          Authorization: `Bearer ${CALENDLY_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      // Mengambil nama dan email setiap invitee
      const invitees = inviteesResponse.data.collection[0];

      // konversi waktu
      const date = new Date(event.start_time);

      // Konversi ke Waktu Indonesia Barat (WIB) dengan menambah offset 7 jam
      const options = {
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const start_time = date.toLocaleString('id-ID', options);

      // Menyimpan data invitees untuk setiap event
      inviteesData.push({
        name: invitees.name,
        email: invitees.email,
        linkMeet: event.location.join_url,
        startTime: start_time,
        // endTime: event.end_time,
        status: 'if else',
      });
    }

    const parseStartTime = (timeStr) => {
      const [dateStr, timeStrPart] = timeStr.split(', ');
      const [day, month, year] = dateStr.split('/').map(Number);
      const [hours, minutes, seconds] = timeStrPart.split('.').map(Number);

      // Mengembalikan objek Date dalam format UTC+7 (WIB)
      return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    };

    // Mengurutkan events berdasarkan startTime
    inviteesData.sort((a, b) => parseStartTime(a.startTime) - parseStartTime(b.startTime));

    // Mendapatkan waktu saat ini
    const now = new Date();

    // Menambahkan format startTime yang lebih mudah dibaca dan menentukan status
    inviteesData.forEach((event) => {
      const date = parseStartTime(event.startTime);
      // event.startTime = date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false });

      // Menentukan status
      event.status = date > now ? 'upcoming' : 'missed';
    });
    res.json(inviteesData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
