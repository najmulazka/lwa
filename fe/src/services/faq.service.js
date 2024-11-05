import axios from 'axios';

export const getFaq = (callback) => {
  axios
    .get(`${import.meta.env.VITE_URL}/faq`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
