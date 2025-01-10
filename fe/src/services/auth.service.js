import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';
const BASE_URL = import.meta.env.VITE_URL;

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register-user`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.err);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login-user`, data);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data.err);
  }
};

export const loginAdmin = async (email, password, navigate, setLoginFailed) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/auth/login`, { email, password });
    CookiesStorage.set(CookiesKey.TokenAdmin, response.data.data.token);
    console.log(response);

    navigate('/admin');
  } catch (err) {
    setLoginFailed(err.response.data.message);
  }
};
