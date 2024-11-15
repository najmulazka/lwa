import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const getSelfCheckLinkedinProfile = (callback) => {
  api
    .get(`/self-check-linkedin-profile`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateSelfCheckLinkedinProfile = (id, data, callback) => {
  api
    .put(`/self-check-linkedin-profile/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
