import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';

function CallbackPage() {
  const navigate = useNavigate();
  console.log(navigate);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      CookiesStorage.set(CookiesKey.AuthToken, token);

      navigate('/user');
    } else if (!CookiesStorage.get(CookiesKey.AuthToken)) {
      navigate('/login');
    }
  }, [navigate]);

  return <div>loading...</div>;
}

export default CallbackPage;
