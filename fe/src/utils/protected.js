import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from './cookies';
import { toast } from 'react-toastify';

export const Protected = ({ children }) => {
  const [FirstLoad, setFirstLoad] = useState(false);
  const navigate = useNavigate();
  const TokenUser = CookiesStorage.get(CookiesKey.TokenAdmin);

  useEffect(() => {
    console.log(TokenUser, 'ini token');
    if (TokenUser == undefined) {
      setFirstLoad(true);
    }
  }, []);

  useEffect(() => {
    if (FirstLoad) {
      toast.warn('Please Login Now');
      navigate('/login/admin');
    }
  }, [FirstLoad]);

  return children;
};
