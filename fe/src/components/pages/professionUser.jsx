import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelfCheckProfessions, updateSelfCheckProfession } from '../../services/selfCheckProfession.service';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';

function ProfessionUser() {
  const [professions, setProfessions] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelfCheckProfessions();
        setProfessions(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate, refresh]);

  const handleClick = async (id, status) => {
    const newStatus = !status;
    const updateLinkedinProfile = professions.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: newStatus } : linkedinProfile));
    setProfessions(updateLinkedinProfile);

    const data = {
      status: newStatus,
    };

    try {
      await updateSelfCheckProfession(id, data);
      setRefresh(!refresh);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }

      const updateLinkedinProfiles = professions.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: status } : linkedinProfile));
      setProfessions(updateLinkedinProfiles);
    }
  };

  return (
    <div>
      <Sidebar role="user" />

      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-blue-900 font-bold">Progress</div>
              <div className="border border-green-500 px-4 rounded-sm text-green-500">{professions.length > 0 ? professions[0].taskProfessions.professions.name : 'none'}</div>
            </div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>

          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full border-separate border-spacing-y-4 border-spacing-x-2">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pb-2 pr-4 text-left">No</th>
                  <th className="text-left pb-2 text-left">Description</th>
                  <th className="w-24 pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {professions.length > 0 &&
                  professions.map((profession) => {
                    return (
                      <tr key={profession.id}>
                        <td className="text-left">{index++}</td>
                        <td className="text-left">{profession.taskProfessions.description}</td>
                        <td className="text-left">
                          <button onClick={() => handleClick(profession.id, profession.status)} className={`w-full ${profession.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                            {profession.status == true ? 'Done' : 'Nope'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessionUser;
