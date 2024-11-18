import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getSelfCheckLandingJobs = async () => {
  const token = CookiesStorage.get(CookiesKey.AuthToken);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/self-check-landing-job`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.AuthToken);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const updateSelfCheckLandingJob = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.AuthToken);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.put(`${BASE_URL}/self-check-landing-job/${id}`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.AuthToken);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
