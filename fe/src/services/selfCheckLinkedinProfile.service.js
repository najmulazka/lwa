import axios from 'axios';

export const getSelfCheckLinkedinProfile = (callback) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
  });

  api
    .get(`/self-check-linkedin-profile`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateSelfCheckLinkedinProfile = (data, callback) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
  });

  api
    .put(`/self-check-linkedin-profile`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
