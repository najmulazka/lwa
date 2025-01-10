import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const CookiesKey = {
  AuthToken: 'TokenUser',
  User: 'User',
  TokenAdmin: 'TokenAdmin',
  Admin: 'Admin',
};

const CookiesOptions = {
  path: '/',
  // secure: process.env.NODE_ENV === 'production',
  maxAge: 24 * 60 * 60,
};

export const CookiesStorage = {
  set: (key, data, options) => {
    return cookies.set(key, data, { ...CookiesOptions, ...options });
  },
  get: (key, options) => {
    return cookies.get(key, { ...CookiesOptions, ...options });
  },
  remove: (key, options) => {
    return cookies.remove(key, { ...CookiesOptions, ...options });
  },
};
