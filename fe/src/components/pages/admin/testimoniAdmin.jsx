import { useEffect, useState } from 'react';
import Overview from '../../fragments/Overview';
import Sidebar from '../../fragments/Sidebar';
import { createTestimoni, deleteTestimoni, getTestimonials, updateTestimoni } from '../../../services/testimoni.service';
import { useNavigate } from 'react-router-dom';
import ModalPopUp from '../../elements/ModalPopUp';
import PopupConfirmation from '../../elements/PopupConfirmation';

function TestimoniAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: '',
    description: '',
  });
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
        console.log(error);
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [refresh, navigate]);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        position: editData.position,
        image: editData.image,
        description: editData.description,
      });
    }
    if (!isOpenModal) {
      setEditData(null);
      setFormData({});
    }
  }, [editData, isOpenModal]);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
    if (isOpenModal) {
      setFormData({ name: '', position: '', image: '', description: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name?.value,
      image: event.target.image?.value,
      position: event.target.position?.value,
      description: event.target.description?.value,
    };

    if (editData) {
      try {
        await updateTestimoni(editData.id, data);
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
        await createTestimoni(data);
        setRefresh(!refresh);
        toggleModal();
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login-admin');
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleEdit = (testimoni) => {
    setEditData(testimoni);
    toggleModal();
  };

  const handleDeleteClick = (id) => {
    setIdDelete(id);
    setIsPopupDelete(true);
  };

  const handleCancel = () => {
    setIdDelete(null);
    setIsPopupDelete(false);
  };

  const handleConfirm = async() => {
    await deleteTestimoni(idDelete);
    setIdDelete(null);
    setRefresh(!refresh);
    setIsPopupDelete(false);
  };

  return (
    <div>
      {isPopupDelete && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="delete" />}

      <ModalPopUp isOpen={isOpenModal} toggleModal={toggleModal}>
        <div className="text-2xl font-semibold mb-6">Testimoni Input</div>
        <form action="" method="post" onSubmit={handleSubmit} onChange={handleInputChange} className="flex flex-col items-center">
          <div className="flex flex-row space-x-4 mb-2 w-full justify-between">
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input type="text" name="name" id="name" placeholder="Jhon Doe" value={formData.name} className="border border-gray-500 p-2 rounded-sm" />
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="position" className="font-semibold">
                Profession
              </label>
              <input type="text" name="position" id="position" placeholder="Input User Profession" value={formData.position} className="border border-gray-500 p-2 rounded-sm" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="description" className="font-semibold">
              Testimoni
            </label>
            <textarea name="description" id="description" placeholder="Testimoni From The User" value={formData.description} className="border border-gray-500 p-2 rounded-sm h-32 w-full resize-none"></textarea>
            <label htmlFor="image" className="font-semibold">
              Link Photo Profile
            </label>
            <input type="text" name="image" id="image" placeholder="https://media.licdn.com/dms/image/v2/D5603AQFAILwthagl0g" value={formData.image} className="border border-gray-500 p-2 rounded-sm" />
          </div>
          <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
            {editData ? 'Update Testimoni' : 'Upload Testimoni'}
          </button>
        </form>
      </ModalPopUp>

      <Sidebar role="admin" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className="py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">List Testimoni</div>
            <div className="space-x-2">
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
              <button className="rounded-full py-2 px-6 text-center text-blue-500 text-sm border border-blue-500 bg-white font-bold" onClick={toggleModal}>
                Input Testimoni
              </button>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
              <table className="table w-full border-separate border-spacing-2">
                <thead>
                  <tr className="text-blue-300">
                    <th className="w-2 pr-4 pb-2 text-left">No</th>
                    <th className="w-1/5 pb-2 text-left">Name</th>
                    <th className="w-2/12 pb-2 text-left">Profession</th>
                    <th className="pb-2 text-left">Description</th>
                    <th className="w-40 pb-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.length > 0 &&
                    testimonials.map((testimoni) => (
                      <tr key={testimoni.id} className="pb-6">
                        <td className="text-left align-top">{`${index++}.`}</td>
                        <td className="text-left align-top">{testimoni.name}</td>
                        <td className="text-left align-top">{testimoni.position}</td>
                        <td className="text-left align-top">{testimoni.description}</td>
                        <td className="text-left space-x-2 align-top">
                          <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEdit(testimoni)}>
                            Edit
                          </button>
                          <button className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDeleteClick(testimoni.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestimoniAdmin;
