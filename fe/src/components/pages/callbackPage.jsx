import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
import { getSelfCheckProfessions } from '../../services/selfCheckProfession.service';

function CallbackPage() {
  const [professions, setProfessions] = useState([]);
  const navigate = useNavigate();
  console.log(navigate);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
          CookiesStorage.set(CookiesKey.AuthToken, token);

          const data = await getSelfCheckProfessions();
          setProfessions(data);
          console.log(data);

          if (data.length <= 0) {
            navigate('/user/dream-job');
          } else {
            navigate('/user');
          }
        } else if (!CookiesStorage.get(CookiesKey.AuthToken)) {
          navigate('/login');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate]);

  return <div>loading...</div>;
}

export default CallbackPage;
