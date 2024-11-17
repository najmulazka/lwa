import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
  },
});

export const getCategoryLandingJob = (callback) => {
  api
    .get(`${import.meta.env.VITE_URL}/category-landing-job`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const createCategoryLandingJob = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/category-landing-job`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateCategoryLandingJob = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/category-landing-job/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteCategoryLandingJob = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/category-landing-job/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
