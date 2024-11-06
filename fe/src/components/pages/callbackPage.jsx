import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CallbackPage() {
  const navigate = useNavigate();
  console.log(navigate);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token);

    if (token) {
      sessionStorage.setItem('token', token);
      navigate('/user');
    } else if (!sessionStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  return <div>loading...</div>;
}

export default CallbackPage;
