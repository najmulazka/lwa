import { useEffect, useState } from 'react';
import { usera } from '../../services/whoami.service';
// import { useNavigate } from 'react-router-dom';

function Overview() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usera();
        setUser(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        console.log(error);
        // if (err.message.includes('Unauthorized')) {
        //   navigate(3);
        // }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-between py-4 px-16 items-center border-b-2 border-gray-200 bg-white">
      <span className="text-3xl">Overview</span>
      <div className="flex flex-row items-center space-x-2">
        <span>{user.name === undefined ? 'Admin' : user.name}</span>
        <img src={user.profilePicture === undefined ? '/account-circle.png' : user.profilePicture} alt="gambar" className="h-10 w-10 rounded-full border border-gray-500" />
      </div>
    </div>
  );
}

export default Overview;
