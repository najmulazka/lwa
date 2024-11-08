import { http } from '../utils/http';

export const whoami = (callback) => {
  http
    .get('/auth/whoami')
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
