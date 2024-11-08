import axios from 'axios';

export const getTestimonials = (callback) => {
  axios
    .get(`${import.meta.env.VITE_URL}/testimoni`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err)
    });
};
