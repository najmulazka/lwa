import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../elements/BarProgress';
import CircleProgress from '../elements/CircleProgress';
import Table from '../elements/Table';
import TableRow from '../elements/TableRow';
import Overview from '../fragments/Overview';
// import SupportResponsifeMobile from '../elements/SupportResponsifeMobile';
import Sidebar from '../fragments/Sidebar';
import { getSelfCheckLandingJobs } from '../../services/selfCheckLandingJob.service';
import { getSelfCheckLinkedinProfiles } from '../../services/selfCheckLinkedinProfile.service';
import { getSelfCheckProfessions } from '../../services/selfCheckProfession.service';

function DashboardUser() {
  const [landingJobs, setLandingJobs] = useState([]);
  const [linkedinProfiles, setLinkedinProfiles] = useState([]);
  const [professions, setProfessions] = useState([]);
  const navigate = useNavigate();
  let index = 1;
  const addPercentage = ((1 / (landingJobs.length + linkedinProfiles.length + professions.length)) * 100).toFixed(2);
  const percent = (
    ((landingJobs.filter((data) => data.status === true).length + linkedinProfiles.filter((data) => data.status === true).length + professions.filter((data) => data.status === true).length) /
      (landingJobs.length + linkedinProfiles.length + professions.length)) *
    100
  ).toFixed(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landingJobs = await getSelfCheckLandingJobs();
        setLandingJobs(landingJobs);

        const data = await getSelfCheckLinkedinProfiles();
        setLinkedinProfiles(data);

        const professions = await getSelfCheckProfessions();
        setProfessions(professions);
      } catch (err) {
        if (err.message.includes('Unauthorized')) {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      {/* Desktop */}
      {/* <div className="hidden lg:block"> */}
        <Sidebar role="user" />
        <div className="bg-gray-100 md:ml-80">
          <Overview />
          <div className="py-3.5 px-4 md:py-4 md:px-16 flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2">
              <div className="mb-4 text-blue-900 font-bold">Progress</div>
              <div className="bg-white rounded-lg px-6 py-4 flex flex-col justify-center h-60">
                <ProgressBar label="Landing a Job" current={landingJobs.filter((data) => data.status === true).length} total={landingJobs.length} />
                <ProgressBar label="Linkedin Profile" current={linkedinProfiles.filter((data) => data.status === true).length} total={linkedinProfiles.length} />
                <ProgressBar label="Professions" current={professions.filter((data) => data.status === true).length} total={professions.length} />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="mb-4 text-blue-900 font-bold">Self Assesment Readyness</div>
              <div className="bg-white rounded-lg px-2 py-4 flex flex-row items-center md:h-60">
                <div className="flex justify-center w-1/2">
                  <CircleProgress percentage={percent} />
                </div>
                <div className="flex flex-col w-1/2 text-left">
                  <span className="mb-2">Youre {percent}% more likely to get the job than other candidates!</span>
                  <span className='text-gray-500 text-base'>Aim for {percent < 100 ? Number(percent) + 15 : percent}% or higher!</span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-3.5 px-4 md:py-4 md:px-16">
            <div className="mb-4 text-blue-900 font-bold">History</div>
            <Table th1="No" th2="To-do List" th3="Description" th4="Progress">
              {landingJobs
                .filter((data) => data.status === true)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 2)
                .map((landingJob) => (
                  <TableRow key={landingJob.id} td1={`${index++}.`} td2={landingJob.taskLandingJob.categoryLandingJob.name} td3={landingJob.taskLandingJob.description}>
                    <button className="w-full bg-green-400 rounded-full py-1 text-white">+{addPercentage}%</button>
                  </TableRow>
                ))}
              {linkedinProfiles
                .filter((data) => data.status === true)
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                .slice(0, 2)
                .map((linkedinProfile) => (
                  <TableRow key={linkedinProfile.id} td1={`${index++}.`} td2={linkedinProfile.taskLinkedinProfile.categoryLinkedinProfile.name} td3={linkedinProfile.taskLinkedinProfile.description}>
                    <button className="w-full bg-green-400 rounded-full py-1 text-white">+{addPercentage}%</button>
                  </TableRow>
                ))}
            </Table>
          </div>
        </div>
      {/* </div> */}
      
      {/* Mobile Responsife */}
      <div className="block lg:hidden">
        
      </div>
    </div>
  );
}

export default DashboardUser;
