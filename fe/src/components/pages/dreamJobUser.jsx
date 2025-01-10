import { useEffect, useState } from 'react';
import vectorDreamJob from '../../assets/vectorDreamJob.svg';
import Nav from '../elements/Nav';
import { useNavigate } from 'react-router-dom';
import { getProfessions, predict } from '../../services/profession.service';
import { toast } from 'react-toastify';
import ModalPopUp from '../elements/ModalPopUp';
import { createSelfCheckProfession } from '../../services/selfCheckProfession.service';

function DreamJobUser() {
  const [professions, setProfessions] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState('default');
  const [customCareer, setCustomCareer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  console.log(prediction);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professions = await getProfessions();
        setProfessions(professions);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const careerToSend = selectedCareer === 'other' && customCareer.trim() !== '' ? customCareer : selectedCareer;

      if (careerToSend === 'default' || careerToSend === 'other' || careerToSend === '') {
        toast.error('Please select or input a valid career!', { position: 'top-center' });
      } else {
        if (selectedCareer === 'other') {
          const text = { text: careerToSend };
          const data = await predict(text);
          console.log(careerToSend);
          console.log(data);
          setPrediction(data);
          toggleModal();
        }

        if (selectedCareer !== 'other' && selectedCareer !== 'default') {
          const data = {
            profession: selectedCareer,
          };
          await createSelfCheckProfession(data);
          navigate('/user');
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedCareer('default');
      customCareer('');
    }
  };

  const handleNo = async () => {
    try {
      setIsLoading(true);
      const data = {
        profession: customCareer,
      };
      await createSelfCheckProfession(data);
      navigate('/user');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYes = async () => {
    try {
      setIsLoading(true);
      const data = {
        profession: prediction,
      };
      await createSelfCheckProfession(data);
      navigate('/user');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen ">
      {isOpen && prediction !== '' && customCareer !== '' && (
        <ModalPopUp isOpen={isOpen} toggleModal={toggleModal} className="">
          Do You Mean {prediction}?
          <div className="flex flex-row mt-10 justify-center space-x-10">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <button className="border border-red-500 px-6 py-2 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500" onClick={handleNo}>
                  No
                </button>
                <button className="border border-green-500 px-6 py-2 rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500" onClick={handleYes}>
                  Yes
                </button>
              </>
            )}
          </div>
        </ModalPopUp>
      )}

      <div className="flex flex-col px-10 md:px-24 pt-5 md:pt-10 md:w-3/5 h-screen" style={{ backgroundImage: `url(${vectorDreamJob})`, backgroundSize: '25%', backgroundRepeat: 'no-repeat', backgroundPosition: 'left bottom' }}>
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 md:h-14 mb-6 md:mb-8" />
        </a>

        <h1 className="font-bold">
          <span>Take the First Step Towards Your Dream Job</span>
        </h1>
        <p className="mb-16 md:mb-6">Select the career you&#39;re aiming for, and let use guide you with expert insight and actionable steps to make it a reality</p>

        <div className="flex flex-col md:w-1/2 space-y-2 md:mb-6">
          <label htmlFor="dreamJob" className="font-bold">
            Chosee Your Career
          </label>
          <select name="dreamJob" id="dreamJob" className="border border-gray-500 rounded-md p-2" value={selectedCareer} onChange={(e) => setSelectedCareer(e.target.value)}>
            <option value="default">Select Career</option>
            {professions.length > 0 &&
              professions.map((profession) => (
                <option key={profession.id} value={profession.name}>
                  {profession.name}
                </option>
              ))}
            <option value="other">Other</option>
          </select>
          {selectedCareer === 'other' && <input type="text" placeholder="Type Your Career" className="border border-gray-500 rounded-md p-2" value={customCareer} onChange={(e) => setCustomCareer(e.target.value)} />}
        </div>

        <button
          className={`text-xs md:text-base font-semibold py-1 md:w-1/3 px-2 md:py-2 md:px-4 border border-2 border-black rounded-lg ${
            isLoading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-black text-white hover:bg-white hover:text-black'
          }`}
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}>
          <span>{isLoading ? 'Loading...' : `Let's Get Started!`}</span>
        </button>

        <div className="md:fixed bottom-10 text-semibold absolute">
          <Nav></Nav>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/3 py-20">
        <img src="/dream-job.png" alt="image" className="" />
      </div>
    </div>
  );
}

export default DreamJobUser;
