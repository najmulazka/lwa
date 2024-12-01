import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

const BASE_URL = import.meta.env.VITE_URL;

export const getTestimonials = async () => {
  // const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  // if (!token) {
  //   throw new Error('Unauthorized: Token is missing');
  // }

  try {
    const response = await axios.get(`${BASE_URL}/testimoni`);
    console.log(response)
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      CookiesStorage.remove(CookiesKey.TokenAdmin);
      throw new Error('Unauthorized: Token is invalid');
    }
    throw error;
  }
};

export const createTestimoni = async (data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.post(`${BASE_URL}/testimoni`, data, {
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

export const updateTestimoni = async (id, data) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.put(`${BASE_URL}/testimoni/${id}`, data, {
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

export const deleteTestimoni = async (id) => {
  const token = CookiesStorage.get(CookiesKey.TokenAdmin);

  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const response = await axios.delete(`${BASE_URL}/testimoni/${id}`, {
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
