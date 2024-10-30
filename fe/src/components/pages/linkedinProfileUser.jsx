import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';

function LinkedinProfileUser() {
  const progress = 'Nope';
  return (
    <div>
      <Sidebar role="user" />
      <div className="bg-gray-100 ml-80">
        <Overview />
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Progress</div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>
          <Table th1="NO" th2="To-do List" th3="Description" th4="Progress">
            <TableRow td1="01." td2="CV" td3="lorem ipsum">
              <button className={`w-full ${progress == 'Done' ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>{progress}</button>
            </TableRow>
            <TableRow td1="01." td2="CV" td3="Lorem">
              <button className={`w-full ${progress == 'Done' ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>{progress}</button>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default LinkedinProfileUser;
