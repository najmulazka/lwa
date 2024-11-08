import { http } from '../utils/http';

export const getSelfCheckLandingJob = (callback) => {

  http
    .get(`/self-check-landing-job`)
    .then((res) => {
      callback(true, res);
    })
    .catch((err) => {
      callback(false, err);
    });
};
