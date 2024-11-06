import axios from 'axios';

export const getBooking = async (callback) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_URL,
    headers: {
      Authorization: `${sessionStorage.getItem('token')}`,
    },
    timeout: 60000,
  });

  await api
    .get(`/booking`)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
