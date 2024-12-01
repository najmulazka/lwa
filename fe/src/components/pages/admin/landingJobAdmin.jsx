import { useEffect, useState } from 'react';
import Overview from '../../fragments/Overview';
import Sidebar from '../../fragments/Sidebar';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from '../../elements/ModalPopUp';
import PopupConfirmation from '../../elements/PopupConfirmation';
import { createCategoryLandingJob, deleteCategoryLandingJob, getCategoryLandingJobs, updateCategoryLandingJob } from '../../../services/categoryLandingJob.service';
import { getTaskLandingJobs, createTaskLandingJob, updateTaskLandingJob, deleteTaskLandingJob } from '../../../services/taskLandingJob.service';
import { CookiesKey, CookiesStorage } from '../../../utils/cookies';
import axios from 'axios';

function LandingJobAdmin() {
  const [taskLandingJobs, setTaskLandingJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categoryLandingJobs, setCategoryLandingJobs] = useState([]);
  const [newCategoryLandingJob, setNewCategoryLandingJob] = useState([]);
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
  const [idDelete, setIdDelete] = useState();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoryLandingJobs();
        // console.log(category);
        setCategoryLandingJobs(category);

        const data = await getTaskLandingJobs();
        setTaskLandingJobs(data);
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
        const response = await axios.get(`${BASE_URL}/task-landing-job?categoryId=${categoryId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTaskLandingJobs(response.data.data);
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
        name: newCategoryLandingJob,
      };

      await createCategoryLandingJob(data);
      setCategoryLandingJobs([...categoryLandingJobs, newCategoryLandingJob]);
      setNewCategoryLandingJob('');
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
        await updateTaskLandingJob(editData.id, data);
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
        await createTaskLandingJob(data);
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
    console.log('edit data', editDataCategory);

    try {
      await updateCategoryLandingJob(editDataCategory.id, data);
      setRefresh(!refresh);
      setEditDataCategory(null);
      toggleModal();
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        navigate('/login-admin');
      }
    }
  };

  const handleEdit = (taskLandingJob) => {
    setEditData(taskLandingJob);
    toggleModal();
  };

  const handleEditCategory = (categoryLandingJob) => {
    setEditDataCategory(categoryLandingJob);
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
    if (type === 'taskLandingJob') {
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
      await deleteTaskLandingJob(idDelete);
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
      await deleteCategoryLandingJob(idDelete);
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

  return (
    <div>
      {isPopupDelete && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="delete" />}
      {isPopupDeleteCategory && <PopupConfirmation onConfirm={() => handleConfirmCategory()} onCancel={handleCancel} type="delete" />}

      {/* Pop Up 1 */}
      {activeModal === 'popup1' && (
        <ModalPopUp isOpen={isOpenModal} toggleModal={toggleModal}>
          <div className="text-2xl font-semibold mb-6">Landing a Job Input</div>
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
                  {categoryLandingJobs.length > 0 &&
                    categoryLandingJobs.map((categoryLandingJob) => (
                      <option key={categoryLandingJob.id} value={categoryLandingJob.id}>
                        {categoryLandingJob.name}
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
                  placeholder="Input Category For Landing a Job"
                  value={newCategoryLandingJob}
                  onChange={(e) => setNewCategoryLandingJob(e.target.value)}
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
            <div className="space-x-4">
              <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
                {editData ? 'Update Landing a Job' : 'Upload Landing a Job'}
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
          <div className="bg-white rounded-lg p-8 relative w-1/2">
            <div className="flex flex-row items-center space-x-2 mb-6 cursor-pointer">
              <div onClick={() => setActiveModal('popup1')}>a</div>
              <div className="text-2xl font-semibold">Manage Category</div>
            </div>
            <div className="flex justify-between">
              <span>Category List</span>
              <span>{categoryLandingJobs.length} Total Category</span>
            </div>
            <table className="table w-full border-separate border-spacing-y-4 border-spacing-x-2">
              <th>No</th>
              <th className="w-[200px]">Category</th>
              <th>Link Date</th>
              <th>Action</th>
              <tbody>
                {categoryLandingJobs.length > 0 &&
                  categoryLandingJobs.map((categoryLandingJob) => (
                    <tr key={categoryLandingJob.id}>
                      <td className="text-center">{`${index++}.`}</td>
                      <td className="text-center align-top bg-blue-100 rounded-lg w-[200px] max-w-[200px] break-words">{categoryLandingJob.name}</td>
                      <td className="text-center">{taskLandingJobs.filter((item) => item.categoryId === categoryLandingJob.id).length}</td>
                      <td className="text-center space-x-2 align-center">
                        <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEditCategory(categoryLandingJob)}>
                          Edit
                        </button>
                        <button className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDeleteClick(categoryLandingJob.id, 'categoryLandingJob')}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={toggleModal} className="absolute -top-3 -right-3 bg-red-600 px-2 text-white rounded-full border-red-600 hover:bg-red-400">
              X
            </button>
          </div>
        </div>
      )}

      {/* Pop Up 3 */}
      {activeModal === 'popup3' && (
        <div className="w-full h-full z-20 fixed bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 relative w-1/2">
            <div className="flex flex-row items-center space-x-2 mb-6 cursor-pointer">
              <div onClick={() => setActiveModal('popup2')}>a</div>
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

      <Sidebar role="admin" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">List Landing a Job</div>
            <div className="space-x-2">
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
              <button className="rounded-full py-2 px-6 text-center text-blue-500 text-sm border border-blue-500 bg-white font-bold" onClick={toggleModal}>
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
                    <select name="category" id="category" value={selectedCategory} onChange={handleCategoryChange} className="w-[200px] max-w-[200px] overflow-hidden text-ellipsis text-left">
                      <option value="0" selected>
                        Category
                      </option>
                      {categoryLandingJobs.length > 0 &&
                        categoryLandingJobs.map((categoryLandingJob) => (
                          <option key={categoryLandingJob.id} value={categoryLandingJob.id}>
                            {categoryLandingJob.name}
                          </option>
                        ))}
                    </select>
                  </th>
                  <th className=" text-left">To-do List</th>
                  <th className="w-40 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {taskLandingJobs.length > 0 &&
                  taskLandingJobs.map((taskLandingJob) => (
                    <tr key={taskLandingJob.id} className="">
                      <td className="text-left align-top">{`${index++}.`}</td>
                      <td className="text-center align-top bg-blue-100 rounded-lg w-[200px] max-w-[200px] break-words">{taskLandingJob.categoryLandingJob.name}</td>
                      <td className="text-left align-top">{taskLandingJob.description}</td>
                      <td className="text-left space-x-2 align-top align-top">
                        <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEdit(taskLandingJob)}>
                          Edit
                        </button>
                        <button className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDeleteClick(taskLandingJob.id, 'taskLandingJob')}>
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

export default LandingJobAdmin;
