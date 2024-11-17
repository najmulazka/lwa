import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const whoami = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/auth/whoami`, {
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

export const usera = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/auth/whoami`, {
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

// const api = axios.create({
//   baseURL: import.meta.env.VITE_URL,
//   headers: {
//     Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
//   },
// });

// export const whoami = async (callback) => {
//   api
//     .get('/auth/whoami')
//     .then((res) => {
//       callback(true, res);
//     })
//     .catch((err) => {
//       callback(false, err);
//     });
// };

// export const usera = async (callback) => {
//   api
//     .get('/auth/user')
//     .then((res) => {
//       callback(true, res);
//     })
//     .catch((err) => {
//       callback(false, err);
//     });
// };
