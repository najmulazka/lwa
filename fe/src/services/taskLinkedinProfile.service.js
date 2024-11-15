import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const getTaskLinkedinProfile = (callback) => {
  api
    .get(`${import.meta.env.VITE_URL}/task-linkedin-profile`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const createTaskLinkedinProfile = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/task-linkedin-profile`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateTaskLinkedinProfile = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/task-linkedin-profile/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteTaskLinkedinProfile = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/task-linkedin-profile/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
