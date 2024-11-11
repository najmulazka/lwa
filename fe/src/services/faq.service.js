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

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `${sessionStorage.getItem('token')}`,
  },
});

export const createFaq = (data, callback) => {
  api
    .post(`${import.meta.env.VITE_URL}/faq`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const updateFaq = (id, data, callback) => {
  api
    .put(`${import.meta.env.VITE_URL}/faq/${id}`, data)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const deleteFaq = (id, callback) => {
  api
    .delete(`${import.meta.env.VITE_URL}/faq/${id}`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
