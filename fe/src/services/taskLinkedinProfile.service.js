import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getTaskLinkedinProfiles = async () => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.get(`${BASE_URL}/task-linkedin-profile`, {
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

export const createTaskLinkedinProfile = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.post(`${BASE_URL}/task-linkedin-profile`, data, {
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

export const updateTaskLinkedinProfile = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.put(`${BASE_URL}/task-linkedin-profile/${id}`, data, {
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

export const deleteTaskLinkedinProfile = async (id) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.delete(`${BASE_URL}/task-linkedin-profile/${id}`, {
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
