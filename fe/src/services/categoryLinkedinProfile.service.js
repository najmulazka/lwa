import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const getCategoryLinkedinProfile = (callback) => {
  api
    .get(`${import.meta.env.VITE_URL}/category-linkedin-profile`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const createCategoryLinkedinProfile = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/category-linkedin-profile`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateCategoryLinkedinProfile = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/category-linkedin-profile/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteCategoryLinkedinProfile = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/category-linkedin-profile/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
