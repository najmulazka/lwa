import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSelfCheckLinkedinProfiles, updateSelfCheckLinkedinProfile } from '../../services/selfCheckLinkedinProfile.service';
import Table from '../elements/Table';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';
import { getCategoryLinkedinProfiles } from '../../services/categoryLinkedinProfile.service';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
import axios from 'axios';
import ModalPopUp from '../elements/ModalPopUp';
import { getReferencesLinkedinProfile } from '../../services/referencesLinkedinProfile.service';

function LinkedinProfileUser() {
  const [referencesLinkedinProfiles, setReferencesLinkedinProfiles] = useState([]);
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const [categoryLinkedinProfiles, setCategoryLinkedinProfiles] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [referencesIsOpen, setReferencesIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const navigate = useNavigate();
  let index = 0;
  let previousCategoryId = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLinkedinProfiles();
        setCategoryLinkedinProfiles(category);

        const references = await getReferencesLinkedinProfile();
        setReferencesLinkedinProfiles(references);

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

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const BASE_URL = import.meta.env.VITE_URL;
    const token = CookiesStorage.get(CookiesKey.AuthToken);

    if (categoryId === '0') {
      setRefresh(!refresh);
    } else if (categoryId !== '0') {
      try {
        const response = await axios.get(`${BASE_URL}/self-check-linkedin-profile?categoryId=${categoryId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLinkedinProfiles(response.data.data);
        // return response.data.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          CookiesStorage.remove(CookiesKey.TokenAdmin);
          throw new Error('Unauthorized: Token is invalid');
        }
        throw error;
      }
    }
  };

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

  const handleReferences = async () => {
    setReferencesIsOpen(!referencesIsOpen);
  };

  return (
    <div>
      {referencesIsOpen && (
        <ModalPopUp isOpen={referencesIsOpen} toggleModal={handleReferences}>
          <div className="grid grid-cols-1 gap-4">
            {referencesLinkedinProfiles.length > 0 &&
              referencesLinkedinProfiles.map((reference) => (
                <div key={reference.fileId} className="flex flex-col items-center">
                  <img src={reference.imageUrl} alt={`Image with fileId: ${reference.fileId}`} className="w-96 object-contain" />
                </div>
              ))}
          </div>
        </ModalPopUp>
      )}
      <Sidebar role="user" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-blue-900 font-bold">Progress</div>
              <button className="bg-green-400 px-4 rounded-full text-white" onClick={handleReferences}>
                References
              </button>
            </div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>
          <Table
            th1="No"
            th2={
              <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="0" selected>
                  Category
                </option>
                {categoryLinkedinProfiles.length > 0 &&
                  categoryLinkedinProfiles.map((categoryLinkedinProfile) => (
                    <option key={categoryLinkedinProfile.id} value={categoryLinkedinProfile.id}>
                      {categoryLinkedinProfile.name}
                    </option>
                  ))}
              </select>
            }
            th3="To-do List"
            th4="Action">
            {linkedinProfiles.length > 0 &&
              linkedinProfiles.map((linkedinProfile) => {
                const isNewCategory = previousCategoryId !== linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                if (isNewCategory) {
                  index++;
                  previousCategoryId = linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.id;
                }
                return (
                  <tr key={linkedinProfile.id}>
                    <td className="text-left">{isNewCategory ? index : ''}</td>
                    <td className="text-center">{linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name}</td>
                    <td className="text-left">{linkedinProfile.taskLinkedinProfile.description}</td>
                    <td className="text-left">
                      <button onClick={() => handleClick(linkedinProfile.id, linkedinProfile.status)} className={`w-full ${linkedinProfile.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                        {linkedinProfile.status == true ? 'Done' : 'Nope'}
                      </button>
                    </td>
                  </tr>

                  // <TableRow key={linkedinProfile.id} td1={`${index++}.`} td2={linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name} td3={linkedinProfile.taskLinkedinProfile.description}>
                  //   <button onClick={() => handleClick(linkedinProfile.id, linkedinProfile.status)} className={`w-full ${linkedinProfile.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>
                  //     {linkedinProfile.status == true ? 'Done' : 'Nope'}
                  //   </button>
                  // </TableRow>
                );
              })}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default LinkedinProfileUser;
