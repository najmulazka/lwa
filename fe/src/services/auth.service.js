import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../utils/cookies';

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
