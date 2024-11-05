require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
