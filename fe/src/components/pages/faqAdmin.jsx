import { useEffect, useState } from 'react';
import Overview from '../fragments/Overview';
import SidebarAdmin from '../fragments/SidebarAdmin';
import { getFaq } from '../../services/faq.service';
import { useNavigate } from 'react-router-dom';
import { whoami } from '../../services/whoami.service';

function FaqAdmin() {
  const [faq, setFaq] = useState([]);
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
  }, [navigate]);
  return (
    <div>
      <SidebarAdmin />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Frequently Asked Questions</div>
            <div className="space-x-2">
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
              <button className="rounded-full py-2 px-6 text-center text-blue-500 text-sm border border-blue-500 bg-white font-bold">Input FAQ</button>
            </div>
          </div>
          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pr-4 pb-2 text-left">No</th>
                  <th className="w-1/4 pb-2 text-left">title</th>
                  <th className="pb-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {faq.length > 0 &&
                  faq.map((faq) => (
                    <tr key={faq.id}>
                      <td className="text-left">{`${index++}.`}</td>
                      <td className="text-left">{faq.question}</td>
                      <td className="text-left">{faq.description}</td>
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
