import { useEffect, useState } from 'react';
import Overview from '../fragments/Overview';
import SidebarAdmin from '../fragments/SidebarAdmin';
import { createFaq, deleteFaq, getFaq, updateFaq } from '../../services/faq.service';
import { useNavigate } from 'react-router-dom';
import { whoami } from '../../services/whoami.service';
import ModalPopUp from '../elements/ModalPopUp';

function FaqAdmin() {
  const [faq, setFaq] = useState([]);
  const [editData, setEditData] = useState();
  const [formData, setFormData] = useState({
    question: '',
    description: '',
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  let index = 1;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login-admin');
    }

    whoami((status, res) => {
      if (status) {
        getFaq((status, res) => {
          if (status) {
            setFaq(res.data.data);
          } else {
            console.log(res);
          }
        });
      } else {
        if (res.status === 401) {
          navigate('/login-admin');
        } else {
          console.log(res);
        }
      }
    });
  }, [navigate, refresh]);

  useEffect(() => {
    if (editData) {
      setFormData({
        question: editData.question,
        description: editData.description,
      });
    }
  }, [editData]);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
    setFormData({ question: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      question: event.target.question?.value,
      description: event.target.description?.value,
    };

    if (editData) {
      updateFaq(editData.id, data, (status, res) => {
        if (status) {
          setRefresh(!refresh);
          setEditData(null);
          toggleModal();
        } else {
          console.log(res);
        }
      });
    } else {
      createFaq(data, (status, res) => {
        if (status) {
          setRefresh(!refresh);
          toggleModal();
          document.getElementById('question').value = '';
          document.getElementById('description').value = '';
        } else {
          console.log(res);
        }
      });
    }
  };

  const handleEdit = (faq) => {
    setEditData(faq);
    toggleModal();
  };

  const handleDelete = (id) => {
    deleteFaq(id, (status, res) => {
      if (status) {
        setRefresh(!refresh);
      } else {
        res;
      }
    });
  };
  return (
    <div>
      <ModalPopUp isOpen={isOpenModal} toggleModal={toggleModal}>
        <div className="text-2xl font-semibold mb-6">Frequently Asked Questions Input</div>
        <form action="" method="post" onSubmit={handleSubmit} onChange={handleInputChange} className="flex flex-col items-center">
          <div className="flex flex-col space-y-2 w-full">
            <label htmlFor="question" className="font-semibold">
              Question
            </label>
            <input type="text" name="question" id="question" value={formData.question} placeholder="" className="border border-gray-500 p-2 rounded-sm" />
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea name="description" id="description" value={formData.description} placeholder="" className="border border-gray-500 p-2 rounded-sm h-32 w-full resize-none"></textarea>
          </div>
          <button type="submit" className="mt-8 bg-black rounded-md text-white py-2 px-4 hover:bg-white hover:text-black border border-black w-auto">
            {editData ? 'Update FAQ' : 'Upload FAQ'}
          </button>
        </form>
      </ModalPopUp>

      <SidebarAdmin />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Frequently Asked Questions</div>
            <div className="space-x-2">
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
              <button className="rounded-full py-2 px-6 text-center text-blue-500 text-sm border border-blue-500 bg-white font-bold" onClick={toggleModal}>
                Input FAQ
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full border-separate border-spacing-2">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pr-4 pb-2 text-left">No</th>
                  <th className="w-1/5 pb-2 text-left">title</th>
                  <th className="pb-2 text-left">Description</th>
                  <th className="w-40 pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {faq.length > 0 &&
                  faq.map((faq) => (
                    <tr key={faq.id}>
                      <td className="text-left align-top">{`${index++}.`}</td>
                      <td className="text-left align-top">{faq.question}</td>
                      <td className="text-left align-top">{faq.description}</td>
                      <td className="text-left space-x-2 align-top align-top">
                        <button className="border border-green-500 rounded-full px-6 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => handleEdit(faq)}>
                          Edit
                        </button>
                        <button className="border border-red-500 rounded-full px-2 text-red-500 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(faq.id)}>
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

export default FaqAdmin;
