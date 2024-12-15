import { useNavigate } from 'react-router-dom';
import Overview from '../../fragments/Overview';
import Sidebar from '../../fragments/Sidebar';
import { useEffect, useState } from 'react';
import { getBookings } from '../../../services/booking.service';

function DashboardAdmin() {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  let numbering = 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getBookings();
        setBooking(data);
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
  }, [navigate]);

  return (
    <div>
      <div className="block lg:hidden text-center bg-red-100 text-red-700 border border-red-300 p-4 rounded">Tampilan belum responsif mobile.</div>
      <div className="hidden lg:block">
        <Sidebar role="admin" />
        <div className="bg-gray-100 ml-80">
          <Overview name="" image="" />
          <div className="py-4 px-16">
            <div className="mb-4 flex justify-between">
              <div className="text-blue-900 font-bold">List Booking</div>
              <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
            </div>
            {isLoading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
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
                    {booking.length > 0 ? (
                      booking.map((item, index) => (
                        <tr key={index}>
                          <td className="text-left pb-2">{numbering++}.</td>
                          <td className="text-left pb-2">{item.startTime}</td>
                          <td className="text-left pb-2">{item.status}</td>
                          <td className="text-left pb-2">{item.name}</td>
                          <td className="text-left pb-2">{item.email}</td>
                          <td className="text-left pb-2">
                            <a href={item.linkMeet} target="_blank" rel="noopener noreferrer">
                              <button className="w-full bg-green-400 rounded-full py-1 text-white">GoogleMeet</button>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No bookings available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
