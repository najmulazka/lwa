// import axiosRetry from 'axios-retry';
// import axios from 'axios';
// import { CookiesKey, CookiesStorage } from '../utils/cookies';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_URL,
//   headers: {
//     Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
//   },
// });

// axiosRetry(api, {
//   retries: 3,
//   retryDelay: (retryCount) => {
//     return retryCount * 2000;
//   },
//   retryCondition: (error) => {
//     return error.response?.status === 429;
//   },
// });

// export const getBooking = async (callback) => {
//   try {
//     const res = await api.get(`/booking`);
//     callback(true, res);
//   } catch (err) {
//     callback(false, err);
//   }
// };


import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getBookings = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/booking`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data; 
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Token tidak valid
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
