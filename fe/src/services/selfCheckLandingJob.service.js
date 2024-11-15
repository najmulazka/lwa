import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const getSelfCheckLandingJob = (callback) => {
  api
    .get(`/self-check-landing-job`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateSelfCheckLandingJob = (id, data, callback) => {
  api
    .put(`/self-check-landing-job/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
