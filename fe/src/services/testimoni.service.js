import axios from 'axios';

export const getTestimonials = (callback) => {
  axios
    .get(`${import.meta.env.VITE_URL}/testimoni`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const createTestimoni = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/testimoni`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateTestimoni = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/testimoni/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteTestimoni = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/testimoni/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
