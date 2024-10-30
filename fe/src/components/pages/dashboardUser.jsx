import ProgressBar from '../elements/BarProgress';
import CircleProgress from '../elements/CircleProgress';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';

function DashboardUser() {
  return (
    <div>
      <Sidebar role="user"/>
      <div className="bg-gray-100 ml-80">
        <Overview/>
        <div className=" py-4 px-16 flex md:flex-row flex-col space-x-8">
          <div className="md:w-1/2">
            <div className="mb-4 text-blue-900 font-bold">Progress</div>
            <div className="bg-white rounded-lg px-6 py-4 flex flex-col justify-center h-60">
              <ProgressBar label="Landing a Job" current="105" total="145" />
              <ProgressBar label="Linkedin Profile" current="45" total="145" />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="mb-4 text-blue-900 font-bold">Self Assesment Readyness</div>
            <div className="bg-white rounded-lg px-2 py-4 flex md:flex-row flex-col items-center h-60">
              <div className="flex justify-center md:w-1/2">
                <CircleProgress percentage="60" />
              </div>
              <div className="flex flex-col md:w-1/2 text-center md:text-left">
                <span className="mb-2">Youre 65% more likely to get the job than other candidates!</span>
                <span>Aim for 85% or higher!</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-4 px-16">
          <div className="mb-4 text-blue-900 font-bold">History</div>
          <Table th1="No" th2="To-do List" th3="Description" th4="Progress">
            <TableRow td1="01." td2="CV" td3="Lorem">
              <button className="w-full bg-green-400 rounded-full py-1 text-white">+0.5%</button>
            </TableRow>
            <TableRow td1="01." td2="CV" td3="Lorem">
              <button className="w-full bg-green-400 rounded-full py-1 text-white">+0.5%</button>
            </TableRow>
            <TableRow td1="01." td2="CV" td3="Lorem">
              <button className="w-full bg-green-400 rounded-full py-1 text-white">+0.5%</button>
            </TableRow>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
