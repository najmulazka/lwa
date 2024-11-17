import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
  },
});

export const whoami = async (callback) => {
  api
    .get('/auth/whoami')
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const usera = async (callback) => {
  api
    .get('/auth/user')
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
