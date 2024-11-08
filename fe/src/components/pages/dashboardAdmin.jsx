import { useNavigate } from 'react-router-dom';
import Overview from '../fragments/Overview';
import SidebarAdmin from '../fragments/SidebarAdmin';
import { useEffect, useState } from 'react';
import { getBooking } from '../../services/booking.service';

function DashboardAdmin() {
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();
  let numbering = 1;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login-admin');
    }

    getBooking((status, res) => {
      console.log(res);
      if (status) {
        setBooking(res.data);
      } else {
        if (res.status === 401 || res.status === 400) {
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
        <Overview name="" image="" />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">List Booking</div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>
          <div className="bg-white rounded-lg px-5 py-6 flex md:flex-row flex-col items-center">
            <table className="table w-full">
              <thead>
                <tr className="text-blue-300">
                  <th className="w-2 pb-2 pr-4 text-left">No</th>
                  <th className="w-1/5 pb-2 text-left">Booking Date</th>
                  <th className="pb-2 text-left">Status</th>
                  <th className="pb-2 text-left">Name</th>
                  <th className="1/5 pb-2 text-left">Email</th>
                  <th className="1/5 pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {booking.length > 0 &&
                  booking.map((booking, index) => (
                    <tr key={index}>
                      <td className="text-left pb-2">{numbering++}.</td>
                      <td className="text-left pb-2">{booking.startTime}</td>
                      <td className="text-left pb-2">{booking.status}</td>
                      <td className="text-left pb-2">{booking.name}</td>
                      <td className="text-left pb-2">{booking.email}</td>
                      <td className="text-left pb-2">
                        <a href={booking.linkMeet} target="_blank">
                          <button className="w-full bg-green-400 rounded-full py-1 text-white">GoogleMeet</button>
                        </a>
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

export default DashboardAdmin;
