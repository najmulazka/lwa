import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getTaskLandingJobs = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/task-landing-job`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createTaskLandingJob = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.post(`${BASE_URL}/task-landing-job`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const updateTaskLandingJob = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.put(`${BASE_URL}/task-landing-job/${id}`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const deleteTaskLandingJob = async (id) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.delete(`${BASE_URL}/task-landing-job/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};
