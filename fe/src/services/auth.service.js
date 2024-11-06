import axios from 'axios';

export const loginAdmin = (data, callback) => {
  axios
    .post(`${import.meta.env.VITE_URL}/auth/login`, data)
    .then((res) => {
      callback(true, res.data);
    })
    .catch((err) => {
      callback(false, err);
    });
};
