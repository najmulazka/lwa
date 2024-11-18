import { useEffect, useState } from 'react';
import Overview from '../../fragments/Overview';
import Sidebar from '../../fragments/Sidebar';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from '../../elements/ModalPopUp';
import PopupConfirmation from '../../elements/PopupConfirmation';
import { createCategoryLinkedinProfile, getCategoryLinkedinProfiles } from '../../../services/categoryLinkedinProfile.service';
import { createTaskLinkedinProfile, deleteTaskLinkedinProfile, getTaskLinkedinProfiles, updateTaskLinkedinProfile } from '../../../services/taskLinkedinProfile.service';

function LinkedinProfileAdmin() {
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const [categoryLinkedinProfiles, setCategoryLinkedinProfiles] = useState([]);
  const [newCategoryLinkedinProfile, setNewCategoryLinkedinProfile] = useState([]);
  const [editData, setEditData] = useState();
  const [formData, setFormData] = useState({
    categoryId: '',
    description: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLinkedinProfiles();
        console.log(category);
        setCategoryLinkedinProfiles(category);

        const data = await getTaskLinkedinProfiles();
        setLinkedinProfiles(data);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    };

    fetchData();
  }, [navigate, refresh]);

  useEffect(() => {
    if (editData) {
      setFormData({
        categoryId: editData.categoryId,
        description: editData.description,
      });
    }
    if (!isOpenModal) {
      setEditData(null);
      setFormData({});
    }
  }, [editData, isOpenModal]);

  const handleAddCategory = () => {
    try {
      const data = {
        name: newCategoryLinkedinProfile,
      };
      createCategoryLinkedinProfile(data);
      setCategoryLinkedinProfiles([...categoryLinkedinProfiles, newCategoryLinkedinProfile]);
      setNewCategoryLinkedinProfile('');
      setRefresh(!refresh);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      categoryId: event.target.category?.value,
      description: event.target.description?.value,
    };

    if (editData) {
      try {
        updateTaskLinkedinProfile(editData.id, data);
        setRefresh(!refresh);
        setEditData(null);
        toggleModal();
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    } else {
      try {
        createTaskLinkedinProfile(data);
        setRefresh(!refresh);
        toggleModal();
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    }
  };

  const handleEdit = (taskLinkedinProfile) => {
    setEditData(taskLinkedinProfile);
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleDeleteClick = (id) => {
    setIdDelete(id);
    setIsPopupDelete(true);
  };

  const handleCancel = () => {
    setIdDelete(null);
    setIsPopupDelete(false);
  };

  const handleConfirm = () => {
    try {
      deleteTaskLinkedinProfile(idDelete);
      setIdDelete(null);
      setRefresh(!refresh);
      setIsPopupDelete(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };
  return (
    <div>
      {isPopupDelete && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="delete" />}

      <ModalPopUp isOpen={isOpenModal} toggleModal={toggleModal}>
        <div className="text-2xl font-semibold mb-6">Linkedin Profile Input</div>
        <form action="" method="post" className="flex flex-col items-center" onSubmit={handleSubmit} onChange={handleInputChange}>
          <div className="flex space-x-4 mb-2 w-full justify-between">
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="category" className="font-semibold">
                Category
              </label>
              <select name="category" id="category" value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} className="border border-gray-500 p-2 rounded-md">
                <option value="0" selected>
                  Select Category
                </option>
                {categoryLinkedinProfiles.length > 0 &&
                  categoryLinkedinProfiles.map((categoryLinkedinProfile) => (
                    <option key={categoryLinkedinProfile.id} value={categoryLinkedinProfile.id}>
                      {categoryLinkedinProfile.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="addCategory" className="font-semibold">
                Add Category
              </label>
              <input
                type="text"
                name="addCategory"
                id="addCategory"
                placeholder="Input Category For Linkedin Profile"
                value={newCategoryLinkedinProfile}
                onChange={(e) => setNewCategoryLinkedinProfile(e.target.value)}
                className="border border-gray-500 p-2 rounded-sm"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">&#39;</div>
              <button type="button" className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={handleAddCategory}>
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="description" className="font-semibold">
              To-do List
            </label>
            <textarea name="description" id="description" placeholder="" value={formData.description} className="border border-gray-500 p-2 rounded-sm h-32 w-full resize-none"></textarea>
          </div>
          <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
            {editData ? 'Update Linkedin Profile' : 'Upload Linkedin Profile'}
          </button>
        </form>
      </ModalPopUp>

      <Sidebar role="admin" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">List Linkedin Profile</div>
            <div className="space-x-2">
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
              <button className="rounded-full py-2 px-6 text-center text-blue-500 text-sm border border-blue-500 bg-white font-bold" onClick={toggleModal}>
                Input To-do List
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full border-separate border-spacing-2">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pr-4 pb-2 text-left">No</th>
                  <th className="w-1/5 pb-2 text-left">
                    <select name="category" id="category">
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
                  </th>
                  <th className="pb-2 text-left">To-do List</th>
                  <th className="w-40 pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {linkedinProfiles.length > 0 &&
                  linkedinProfiles.map((taskLinkedinProfile) => (
                    <tr key={taskLinkedinProfile.id}>
                      <td className="text-left align-top">{`${index++}.`}</td>
                      <td className="text-left align-top">{taskLinkedinProfile.categoryLinkedinProfile.name}</td>
                      <td className="text-left align-top">{taskLinkedinProfile.description}</td>
                      <td className="text-left space-x-2 align-top align-top">
                        <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEdit(taskLinkedinProfile)}>
                          Edit
                        </button>
                        <button className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDeleteClick(taskLinkedinProfile.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkedinProfileAdmin;
