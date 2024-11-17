import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${CookiesStorage.get(CookiesKey.TokenAdmin)}`,
  },
});

export const getTaskLandingJob = (callback) => {
  api
    .get(`${import.meta.env.VITE_URL}/task-landing-job`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const createTaskLandingJob = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/task-landing-job`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateTaskLandingJob = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/task-landing-job/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteTaskLandingJob = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/task-landing-job/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
