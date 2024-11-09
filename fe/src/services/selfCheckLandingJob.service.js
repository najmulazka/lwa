import axios from 'axios';

export const getSelfCheckLandingJob = (callback) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
  });
  
  api
    .get(`/self-check-landing-job`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
