import Overview from '../fragments/Overview';
import SidebarAdmin from '../fragments/SidebarAdmin';

function FaqAdmin() {
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
                <tr>
                  <td className="text-left">01.</td>
                  <td className="text-left">loremm</td>
                  <td className="text-left">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum porro quos neque ipsam adipisci numquam sit harum, consequuntur quod doloribus expedita eos. Provident animi magnam aspernatur non, nostrum quaerat odio.
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

export default FaqAdmin;
