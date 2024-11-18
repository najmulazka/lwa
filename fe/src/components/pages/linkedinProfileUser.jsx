import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelfCheckLinkedinProfiles, updateSelfCheckLinkedinProfile } from '../../services/selfCheckLinkedinProfile.service';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';

function LinkedinProfileUser() {
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  console.log(linkedinProfiles);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSelfCheckLinkedinProfiles();
        setLinkedinProfiles(data);
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
    const updateLinkedinProfile = linkedinProfiles.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: newStatus } : linkedinProfile));
    setLinkedinProfiles(updateLinkedinProfile);

    const data = {
      status: newStatus,
    };

    try {
      await updateSelfCheckLinkedinProfile(id, data);
      setRefresh(!refresh);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login');
      }

      const updateLinkedinProfiles = linkedinProfiles.map((linkedinProfile) => (linkedinProfile.id === id ? { ...linkedinProfile, status: status } : linkedinProfile));
      setLinkedinProfiles(updateLinkedinProfiles);
    }
  };

  return (
    <div>
      <Sidebar role="user" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Progress</div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>
          <Table
            th1="No"
            th2={
              <select name="category" id="category">
                <option value="0" selected>
                  Category
                </option>
                <option value="1">Cats</option>
                <option value="2">fCats</option>
                <option value="3">Csdats</option>
              </select>
            }
            th3="To-do List"
            th4="Action">
            {linkedinProfiles.length > 0 &&
              linkedinProfiles
                .sort((a, b) => a.id - b.id)
                .map((linkedinProfile) => (
                  <TableRow key={linkedinProfile.id} td1={`${index++}.`} td2={linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name} td3={linkedinProfile.taskLinkedinProfile.description}>
                    <button onClick={() => handleClick(linkedinProfile.id, linkedinProfile.status)} className={`w-full ${linkedinProfile.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                      {linkedinProfile.status == true ? 'Done' : 'Nope'}
                    </button>
                  </TableRow>
                ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default LinkedinProfileUser;
