import axios from 'axios';

export const getFaq = (callback) => {
  axios
    .get(`${import.meta.env.VITE_URL}/faq`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};