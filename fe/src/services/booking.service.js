import axiosRetry from 'axios-retry';
import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
  },
});

axiosRetry(api, {
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
    const res = await api.get(`/booking`);
    callback(true, res);
  } catch (err) {
    callback(false, err);
  }
};
