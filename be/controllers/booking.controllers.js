const { CALENDLY_TOKEN } = process.env;
const axios = require('axios');
const prisma = require('../libs/prisma.libs');
const { format, isBefore } = require('date-fns');

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      const bookings = await prisma.booking.findMany();

      const formatDateAndAddStatus = (dateString) => {
        const startDate = new Date(dateString);
        const currentDate = new Date();
        const status = isBefore(startDate, currentDate) ? 'missed' : 'upcoming';

        return {
          formattedDate: format(startDate, 'dd-MM-yyyy HH:mm:ss'),
          status,
        };
      };

      const formattedBookings = bookings.map((booking) => {
        const { formattedDate, status } = formatDateAndAddStatus(booking.startTime);
        return {
          ...booking,
          startTime: formattedDate,
          status: status,
        };
      });

      res.status(200).json({
        status: true,
        message: 'OK',
        data: formattedBookings,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  getBookingCalendly: async (req, res) => {
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

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const inviteesData = [];
      for (const event of events) {
        try {
          const eventUuid = event.uri.split('/').pop();
          const inviteesResponse = await axios.get(`https://api.calendly.com/scheduled_events/${eventUuid}/invitees`, {
            headers: {
              Authorization: `Bearer ${CALENDLY_TOKEN}`,
              'Content-Type': 'application/json',
            },
          });

          const invitee = inviteesResponse.data.collection[0];

          // Tambahkan hasil ke array
          inviteesData.push({
            uuid: eventUuid,
            name: invitee.name,
            email: invitee.email,
            linkMeet: event.location.join_url,
            startTime: event.start_time,
            // status: '',
          });

          console.log(inviteesData);

          // Tunggu 5 detik
          await delay(5000);
        } catch (err) {
          console.error(`Error processing event: ${event.uri}`, err.message);
        }
      }

      try {
        const existingBookings = await prisma.booking.findMany({
          where: {
            uuid: {
              in: inviteesData.map((data) => data.uuid),
            },
          },
          select: { uuid: true },
        });

        // Filter data baru yang belum ada di database
        const newBookings = inviteesData.filter((data) => !existingBookings.some((booking) => booking.uuid === data.uuid));

        if (newBookings.length > 0) {
          await prisma.booking.createMany({
            data: newBookings,
            skipDuplicates: true,
          });
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
