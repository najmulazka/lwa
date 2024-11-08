import axiosRetry from 'axios-retry';
import { http } from '../utils/http';

axiosRetry(http, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 2000;
  },
  retryCondition: (error) => {
    return error.response?.status === 429;
  },
});

export const getBooking = async (callback) => {
  try {
    const res = await http.get(`/booking`);
    callback(true, res);
  } catch (err) {
    callback(false, err);
  }
};
