import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';
import { getSelfCheckLandingJob } from '../../services/selfCheckLandingJob.service';

function LandingJobUser() {
  const [landingJobs, setLandingJobs] = useState([]);
  const navigate = useNavigate;
  let index = 1;

  useEffect(() => {
    getSelfCheckLandingJob((status, res) => {
      if (status) {
        setLandingJobs(res.data.data);
      } else {
        if (res.status === 401) {
          navigate('/login');
        } else {
          console.log(res.response.data.message);
        }
      }
    });
  }, [navigate]);

  return (
    <div>
      <Sidebar role="user" />
      <div className="bg-gray-100 ml-80">
        {landingJobs.slice(0, 1).map((landingJob) => (
          <Overview key={landingJob.id} name={landingJob.users.name} image={landingJob.users.profilePicture} />
        ))}
        <div className=" py-4 px-16">
          <div className="mb-4 flex justify-between">
            <div className="text-blue-900 font-bold">Progress</div>
            <input type="text" id="search" className="rounded-full py-2 px-2 text-center text-gray-800 text-sm shadow-md" placeholder="Search for something" />
          </div>
          <Table th1="NO" th2="To-do List" th3="Description" th4="Progress">
            {landingJobs.map(
              (landingJob) =>
                landingJob.taskLandingJob.taskName === 'CV' && (
                  <TableRow key={landingJob.id} td1={`${index++}.`} td2={landingJob.taskLandingJob.taskName} td3={landingJob.taskLandingJob.description}>
                    <button className={`w-full ${landingJob.status == true ? 'bg-green-400' : 'bg-red-400'} rounded-full py-1 text-white`}>{landingJob.status == true ? 'Done' : 'Nope'}</button>
                  </TableRow>
                )
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default LandingJobUser;
