import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../elements/BarProgress';
import CircleProgress from '../elements/CircleProgress';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
import Sidebar from '../fragments/Sidebar';
import { getSelfCheckLandingJob } from '../../services/selfCheckLandingJob.service';
import { getSelfCheckLinkedinProfile } from '../../services/selfCheckLinkedinProfile.service';

function DashboardUser() {
  const [landingJobs, setLandingJobs] = useState([]);
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const navigate = useNavigate();
  let index = 1;
  const addPercentage = (1 / (landingJobs.length + linkedinProfiles.length)) * 100;
  const percent = ((landingJobs.filter((data) => data.status === true).length + linkedinProfiles.filter((data) => data.status === true).length) / (landingJobs.length + linkedinProfiles.length)) * 100;

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    console.log(token);
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

    getSelfCheckLinkedinProfile((status, res) => {
      if (status) {
        setLinkedinProfiles(res.data.data);
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
        {/* {landingJobs.slice(0, 1).map((landingJob) => (
          <Overview key={landingJob.id} name={landingJob.users.name} image={landingJob.users.profilePicture} />
        ))} */}
        <Overview />
        <div className=" py-4 px-16 flex md:flex-row flex-col space-x-8">
          <div className="md:w-1/2">
            <div className="mb-4 text-blue-900 font-bold">Progress</div>
            <div className="bg-white rounded-lg px-6 py-4 flex flex-col justify-center h-60">
              <ProgressBar label="Landing a Job" current={landingJobs.filter((data) => data.status === true).length} total={landingJobs.length} />
              <ProgressBar label="Linkedin Profile" current={linkedinProfiles.filter((data) => data.status === true).length} total={linkedinProfiles.length} />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="mb-4 text-blue-900 font-bold">Self Assesment Readyness</div>
            <div className="bg-white rounded-lg px-2 py-4 flex md:flex-row flex-col items-center h-60">
              <div className="flex justify-center md:w-1/2">
                <CircleProgress percentage={percent} />
              </div>
              <div className="flex flex-col md:w-1/2 text-center md:text-left">
                <span className="mb-2">Youre {percent}% more likely to get the job than other candidates!</span>
                <span>Aim for {percent < 100 ? percent + 15 : percent}% or higher!</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-4 px-16">
          <div className="mb-4 text-blue-900 font-bold">History</div>
          <Table th1="No" th2="To-do List" th3="Description" th4="Progress">
            {landingJobs
              .filter((data) => data.status === true)
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 5)
              .map((landingJob) => (
                <TableRow key={landingJob.id} td1={`${index++}.`} td2={landingJob.taskLandingJob.taskName} td3={landingJob.taskLandingJob.description}>
                  <button className="w-full bg-green-400 rounded-full py-1 text-white">+{addPercentage}%</button>
                </TableRow>
              ))}
            {linkedinProfiles
              .filter((data) => data.status === true)
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 5)
              .map((linkedinProfile) => (
                <TableRow key={linkedinProfile.id} td1={`${index++}.`} td2={linkedinProfile.taskLinkedinProfile.taskName} td3={linkedinProfile.taskLinkedinProfile.description}>
                  <button className="w-full bg-green-400 rounded-full py-1 text-white">+{addPercentage}%</button>
                </TableRow>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
