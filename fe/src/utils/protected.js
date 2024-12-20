import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from './cookies';
import { toast } from 'react-toastify';

export const Protected = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const TokenAdmin = CookiesStorage.get(CookiesKey.TokenAdmin);

  useEffect(() => {
    console.log(TokenAdmin, 'ini token admin');
    if (TokenAdmin == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/login-admin');
    }
  }, [FirstLoad]);

  return children;
};

export const ProtectedUser = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const TokenUser = CookiesStorage.get(CookiesKey.AuthToken);

  useEffect(() => {
    // console.log(TokenUser, 'ini token user');
    if (TokenUser == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/login');
    }
  }, [FirstLoad]);

  return children;
};
