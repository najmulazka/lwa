require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');
const routes = require('./routes');
const { getBookingCalendly } = require('./controllers/booking.controllers');
const { notFoundHandler } = require('./middlewares/notfound.middlewares');
const { errorHandler } = require('./middlewares/error.middlewares');
const { jsonResponse } = require('./middlewares/jsonResponse.middlewares');
const { PORT = 3000, OPENAI_API_KEY } = process.env;

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


// cron.schedule('*/30 * * * *', () => {
//   console.log('a');
//   getBookingCalendly();
// });
app.use(jsonResponse);

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
