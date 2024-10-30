import Overview from '../fragments/Overview';
import SidebarAdmin from '../fragments/SidebarAdmin';

function DashboardAdmin() {
  return (
    <div>
      <SidebarAdmin/>
      <div className="bg-gray-100 ml-80">
        <Overview />
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
                  <th className="pb-2 text-left">Name</th>
                  <th className="1/5 pb-2 text-left">Email</th>
                  <th className="1/5 pb-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">01.</td>
                  <td className="text-left">28 Oct 2024</td>
                  <td className="text-left">Budi Pambudi</td>
                  <td className="text-left">budipambudi@gmail.com</td>
                  <td className="text-left">
                    <button className="w-full bg-green-400 rounded-full py-1 text-white">GoogleMeet</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
