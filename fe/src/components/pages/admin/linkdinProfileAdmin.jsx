import { useEffect, useState } from 'react';
import Overview from '../../fragments/Overview';
import Sidebar from '../../fragments/Sidebar';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from '../../elements/ModalPopUp';
import PopupConfirmation from '../../elements/PopupConfirmation';
import { createCategoryLinkedinProfile, deleteCategoryLinkedinProfile, getCategoryLinkedinProfiles, updateCategoryLinkedinProfile } from '../../../services/categoryLinkedinProfile.service';
import { createTaskLinkedinProfile, deleteTaskLinkedinProfile, getTaskLinkedinProfiles, updateTaskLinkedinProfile } from '../../../services/taskLinkedinProfile.service';
import axios from 'axios';
import { CookiesKey, CookiesStorage } from '../../../utils/cookies';
import { getReferencesLinkedinProfile, updateReferencesLinkedinProfile } from '../../../services/referencesLinkedinProfile.service';
import SupportResponsifeMobile from '../../elements/SupportResponsifeMobile';

function LinkedinProfileAdmin() {
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryLinkedinProfiles, setCategoryLinkedinProfiles] = useState([]);
  const [newCategoryLinkedinProfile, setNewCategoryLinkedinProfile] = useState([]);
  const [editData, setEditData] = useState();
  const [formData, setFormData] = useState({
    categoryId: '',
    description: '',
  });
  const [editDataCategory, setEditDataCategory] = useState();
  const [formDataCategory, setFormDataCategory] = useState({
    id: '',
    name: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [isPopupDeleteCategory, setIsPopupDeleteCategory] = useState(false);
  const [referencesIsOpen, setReferencesIsOpen] = useState(false);
  const [referencesLinkedinProfiles, setReferencesLinkedinProfiles] = useState(null);
  const [isPopupManageReferences, setIsPopupManageReferences] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let index = 0;
  let number = 1;
  let previousCategoryId = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLinkedinProfiles();
        setCategoryLinkedinProfiles(category);

        const data = await getTaskLinkedinProfiles();
        setLinkedinProfiles(data);

        const references = await getReferencesLinkedinProfile();
        setReferencesLinkedinProfiles(references);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    };

    fetchData();
  }, [navigate, refresh]);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const BASE_URL = import.meta.env.VITE_URL;
    const token = CookiesStorage.get(CookiesKey.TokenAdmin);

    if (categoryId === '0') {
      setRefresh(!refresh);
    } else if (categoryId !== '0') {
      try {
        const response = await axios.get(`${BASE_URL}/task-linkedin-profile?categoryId=${categoryId}`, {
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

  useEffect(() => {
    if (editDataCategory) {
      setFormDataCategory({
        id: editDataCategory.id,
        name: editDataCategory.name,
      });
    }
    if (!isOpenModal) {
      setEditDataCategory(null);
      setFormDataCategory({});
    }
  }, [editDataCategory, isOpenModal]);

  const handleAddCategory = async () => {
    try {
      const data = {
        name: newCategoryLinkedinProfile,
      };
      await createCategoryLinkedinProfile(data);
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
    setActiveModal('popup1');
    setIsOpenModal(!isOpenModal);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      categoryId: event.target.category?.value,
      description: event.target.description?.value,
    };

    if (editData) {
      try {
        await updateTaskLinkedinProfile(editData.id, data);
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
        await createTaskLinkedinProfile(data);
        setRefresh(!refresh);
        toggleModal();
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    }
  };

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name?.value,
    };

    try {
      await updateCategoryLinkedinProfile(editDataCategory.id, data);
      setRefresh(!refresh);
      setEditDataCategory(null);
      toggleModal();
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const handleEdit = (taskLinkedinProfile) => {
    setEditData(taskLinkedinProfile);
    toggleModal();
  };

  const handleEditCategory = (categoryLinkedinProfile) => {
    setEditDataCategory(categoryLinkedinProfile);
    setActiveModal('popup3');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleDeleteClick = (id, type) => {
    setIdDelete(id);
    if (type === 'taskLinkedinProfile') {
      setIsPopupDelete(true);
    } else {
      setIsPopupDeleteCategory(true);
    }
  };

  const handleCancel = () => {
    setIdDelete(null);
    setIsPopupDelete(false);
    setIsPopupDeleteCategory(false);
  };

  const handleConfirm = async () => {
    try {
      console.log(idDelete);
      await deleteTaskLinkedinProfile(idDelete);
      setIdDelete(null);
      setRefresh(!refresh);
      setIsPopupDelete(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const handleConfirmCategory = async () => {
    try {
      await deleteCategoryLinkedinProfile(idDelete);
      // console.log(idDelete);
      setIdDelete(null);
      setRefresh(!refresh);
      setIsPopupDeleteCategory(false);
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const handleReferences = () => {
    setReferencesIsOpen(!referencesIsOpen);
  };

  const handleManageReferences = () => {
    setIsPopupManageReferences(!isPopupManageReferences);
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file, index) => ({
      id: Date.now() + index,
      imageUrl: URL.createObjectURL(file),
      file,
    }));
    setReferencesLinkedinProfiles([...referencesLinkedinProfiles, ...uploadedFiles]);
  };

  const handleFileDelete = (id) => {
    setReferencesLinkedinProfiles(referencesLinkedinProfiles.filter((file) => file.id !== id));
  };

  const handleUpdateReferences = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      referencesLinkedinProfiles.forEach((item) => {
        formData.append(`image`, item.file);
      });
      await updateReferencesLinkedinProfile(formData);
      handleManageReferences();
    } catch (err) {
      alert('Failed to update references!');
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SupportResponsifeMobile>
      {isPopupDelete && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="delete" />}
      {isPopupDeleteCategory && <PopupConfirmation onConfirm={() => handleConfirmCategory()} onCancel={handleCancel} type="delete" />}

      {/* Pop Up 1 */}
      {activeModal === 'popup1' && (
        <ModalPopUp isOpen={isOpenModal} toggleModal={toggleModal}>
          <div className="text-2xl font-semibold mb-6">Linkedin Profile {editData ? 'Update' : 'Input'}</div>
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
                <div className="flex text-white">&#39;</div>
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
            <div className="space-x-4">
              <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
                {editData ? 'Update Linkedin Profile' : 'Upload Linkedin Profile'}
              </button>
              <button type="button" className="mt-8 bg-white rounded-md text-black py-2 px-4 hover:bg-black hover:text-white border border-black w-auto" onClick={() => setActiveModal('popup2')}>
                Manage Category
              </button>
            </div>
          </form>
        </ModalPopUp>
      )}

      {/* Pop Up 2 */}
      {activeModal === 'popup2' && (
        <div className="w-full h-full z-20 fixed bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 relative max-h-[90vh] w-[65%] overflow-y-auto">
            <div className="flex flex-row items-center space-x-2 mb-6">
              <button onClick={() => setActiveModal('popup1')} className="hover:text-gray-500">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
              </button>
              <div className="text-2xl font-semibold">Manage Category</div>
            </div>
            <div className="flex justify-between">
              <span>Category List</span>
              <span>{categoryLinkedinProfiles.length} Total Category</span>
            </div>
            <table className="table w-full  border-separate border-spacing-y-4 border-spacing-x-2">
              <th>No</th>
              <th className="w-[200px]">Category</th>
              <th>Link Date</th>
              <th className="w-20">Action</th>
              <tbody>
                {categoryLinkedinProfiles.length > 0 &&
                  categoryLinkedinProfiles.map((categoryLinkedinProfile) => (
                    <tr key={categoryLinkedinProfile.id}>
                      <td className="text-center">{`${index++}.`}</td>
                      <td className="text-center align-top bg-blue-100 rounded-lg w-[200px] max-w-[200px] break-words">{categoryLinkedinProfile.name}</td>
                      <td className="text-center ">{linkedinProfiles.filter((item) => item.categoryId === categoryLinkedinProfile.id).length}</td>
                      <td className="text-center">
                        <div className="space-x-2 flex flex-row">
                          <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEditCategory(categoryLinkedinProfile)}>
                            Edit
                          </button>
                          <button
                            className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white flex flex-row space-x-1 items-center"
                            onClick={() => handleDeleteClick(categoryLinkedinProfile.id, 'categoryLandingJob')}>
                            <div>Delete</div>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={toggleModal} className="absolute top-3  right-3 bg-red-600 px-2 text-white rounded-full border-red-600 hover:bg-red-400">
              X
            </button>
          </div>
        </div>
      )}

      {/* Pop Up 3 */}
      {activeModal === 'popup3' && (
        <div className="w-full h-full z-20 fixed bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 relative w-1/2">
            <div className="flex flex-row items-center space-x-2 mb-6">
              <button onClick={() => setActiveModal('popup2')}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                </svg>
              </button>
              <div className="text-2xl font-semibold">Manage Category</div>
            </div>
            <form action="" method="post" onSubmit={handleUpdateCategory}>
              <div className="flex flex-col">
                <label htmlFor="name" className="font-semibold">
                  Category
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formDataCategory.name}
                  placeholder=""
                  onChange={(e) => setFormDataCategory({ ...formDataCategory, name: e.target.value })}
                  className="border border-gray-500 bg-gray-200 p-2 rounded-md"
                />
              </div>
              <div className="space-x-4 flex justify-center">
                <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
                  Update Category
                </button>
                {/* <button type="button" className="mt-8 bg-white rounded-md text-black py-2 px-4 hover:bg-black hover:text-white border border-black w-auto" onClick={toggleModal}>
                  Cancel
                </button> */}
              </div>
            </form>
            <button onClick={toggleModal} className="absolute -top-3 -right-3 bg-red-600 px-2 text-white rounded-full border-red-600 hover:bg-red-400">
              X
            </button>
          </div>
        </div>
      )}

      {/* Pop Up References */}
      {referencesIsOpen && (
        <ModalPopUp isOpen={referencesIsOpen} toggleModal={handleReferences}>
          <div className="grid grid-cols-1 gap-4" onClick={handleReferences}>
            {referencesLinkedinProfiles.length > 0 &&
              referencesLinkedinProfiles.map((reference) => (
                <div key={reference.fileId} className="flex flex-col items-center">
                  <img src={reference.imageUrl} alt={`Image with fileId: ${reference.fileId}`} className="w-full object-contain" />
                </div>
              ))}
          </div>
        </ModalPopUp>
      )}

      {/* Pop Up Manage References */}
      {isPopupManageReferences && (
        <ModalPopUp isOpen={isPopupManageReferences} toggleModal={handleManageReferences}>
          <div className="text-2xl font-semibold text-blue-900 mb-6">Manage References</div>
          <button className="border border-green-400 text-green-400 px-4 py-1 font-semibold rounded-full mb-6" onClick={() => document.getElementById('fileInput').click()}>
            Upload Image
          </button>
          <input id="fileInput" type="file" multiple accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          <div className="h-[50vh] border border-gray-300 rounded-lg mb-6 p-4">
            <div className="flex flex-wrap">
              {referencesLinkedinProfiles.length > 0 &&
                referencesLinkedinProfiles.map((reference) => (
                  <div key={reference.fileId} className="relative mr-6 mb-2 bg-blue-900">
                    <div className="absolute bg-blue-600 text-white -top-1 -left-1 rounded-full w-4 text-xs text-center">{number++}</div>
                    <button className="absolute top-1 right-1 bg-red-600 w-4 h-4 text-white text-xs rounded-full border-red-600 hover:bg-red-400" onClick={() => handleFileDelete(reference.id)}>
                      X
                    </button>
                    <img className="h-36" src={reference.imageUrl} alt={`Image with id: ${reference.id}`} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="border text-white bg-black hover:bg-gray-800 px-4 py-2 font-semibold rounded-lg" onClick={handleUpdateReferences}>
              {loading ? 'loading...' : 'Update References'}
            </button>
          </div>
        </ModalPopUp>
      )}

      <Sidebar role="admin" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="flex space-x-4 items-center">
              <div className="text-blue-900 font-bold">List Linkedin Profile</div>
              <button className="group bg-green-400 border border-green-400 text-white hover:bg-white hover:text-green-400 px-4 py-1 rounded-full font-semibold flex flex-row space-x-2" onClick={handleReferences}>
                <div>References</div>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="group-hover:fill-green-400">
                  <path d="M12.0003 3.5C17.3924 3.5 21.8784 7.37976 22.8189 12.5C21.8784 17.6202 17.3924 21.5 12.0003 21.5C6.60812 21.5 2.12215 17.6202 1.18164 12.5C2.12215 7.37976 6.60812 3.5 12.0003 3.5ZM12.0003 19.5C16.2359 19.5 19.8603 16.552 20.7777 12.5C19.8603 8.44803 16.2359 5.5 12.0003 5.5C7.7646 5.5 4.14022 8.44803 3.22278 12.5C4.14022 16.552 7.7646 19.5 12.0003 19.5ZM12.0003 17C9.51498 17 7.50026 14.9853 7.50026 12.5C7.50026 10.0147 9.51498 8 12.0003 8C14.4855 8 16.5003 10.0147 16.5003 12.5C16.5003 14.9853 14.4855 17 12.0003 17ZM12.0003 15C13.381 15 14.5003 13.8807 14.5003 12.5C14.5003 11.1193 13.381 10 12.0003 10C10.6196 10 9.50026 11.1193 9.50026 12.5C9.50026 13.8807 10.6196 15 12.0003 15Z" />
                </svg>
              </button>
              <button className="border border-green-400 text-green-400 hover:text-white hover:bg-green-400 px-4 py-1 font-semibold rounded-full bg-white flex flex-row space-x-2" onClick={handleManageReferences}>
                <span>Manage References</span>
                <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 3C20.5523 3 21 3.44772 21 4V5.757L19 7.757V5H5V13.1L9 9.1005L13.328 13.429L11.9132 14.8422L9 11.9289L5 15.928V19H15.533L16.2414 19.0012L17.57 17.671L18.8995 19H19V16.242L21 14.242V20C21 20.5523 20.5523 21 20 21H4C3.45 21 3 20.55 3 20V4C3 3.44772 3.44772 3 4 3H20ZM21.7782 7.80761L23.1924 9.22183L15.4142 17L13.9979 16.9979L14 15.5858L21.7782 7.80761ZM15.5 7C16.3284 7 17 7.67157 17 8.5C17 9.32843 16.3284 10 15.5 10C14.6716 10 14 9.32843 14 8.5C14 7.67157 14.6716 7 15.5 7Z"></path>
                </svg>
              </button>
              {/* <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                // onChange={handleFileChange}
                style={{ display: 'none' }}
              /> */}
            </div>
            <div className="space-x-2">
              {/* <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" /> */}
              <button className="rounded-full py-2 px-6 text-center bg-white text-blue-500 hover:text-blue-800 hover:border-blue-800 text-sm border border-blue-500 font-bold" onClick={toggleModal}>
                Input To-do List
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full border-separate border-spacing-y-4 border-spacing-x-2">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pr-4 text-left">No</th>
                  <th className="w-1/5 text-left">
                    <select name="category" id="category" className="w-[200px] max-w-[200px] overflow-hidden text-ellipsis text-left" value={selectedCategory} onChange={handleCategoryChange}>
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
                  <th className="text-left">To-do List</th>
                  <th className="w-40 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {linkedinProfiles.length > 0 &&
                  linkedinProfiles.map((taskLinkedinProfile) => {
                    const isNewCategory = previousCategoryId !== taskLinkedinProfile.categoryLinkedinProfile.id;
                    if (isNewCategory) {
                      index++;
                      previousCategoryId = taskLinkedinProfile.categoryLinkedinProfile.id;
                    }
                    return (
                      <tr key={taskLinkedinProfile.id}>
                        <td className="text-left align-top">{isNewCategory ? index : ''}</td>
                        <td className="text-left align-top w-[200px] max-w-[200px] break-words">{taskLinkedinProfile.categoryLinkedinProfile.name}</td>
                        <td className="text-left align-top">{taskLinkedinProfile.description}</td>
                        <td className="text-left space-x-2 flex flex-row align-top align-top">
                          <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEdit(taskLinkedinProfile)}>
                            Edit
                          </button>
                          <button
                            className="border border-red-500 items-center rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white flex flex-row space-x-1"
                            onClick={() => handleDeleteClick(taskLinkedinProfile.id, 'taskLinkedinProfile')}>
                            <div>Delete</div>
                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path>
                            </svg>
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
    </SupportResponsifeMobile>
  );
}

export default LinkedinProfileAdmin;
