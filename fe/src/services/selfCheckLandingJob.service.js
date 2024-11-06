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
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
