import CircleProgress from '../elements/CircleProgress';

function DashboardUser() {
  return (
    <div className="flex flex-row">
      <div className="w-80 h-screen md:py-4 md:px-16 border-r-2 border-gray-200 bg-white">
        <div className="mb-6">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="h-15" />
          </a>
        </div>
        <div className="py-2">
          <a href="#">Dashboard</a>
        </div>
        <div className="py-2">
          <a href="#">Landing a Job</a>
        </div>
        <div className="py-2">
          <a href="#">Linkeding Profile</a>
        </div>
      </div>
      <div className="w-full bg-gray-100 h-auto">
        <div className="flex flex-row justify-between py-4 px-16 items-center border-b-2 border-gray-200  bg-white">
          <span className="text-3xl">Overview</span>
          <img src="branding1.png" alt="gambar" className="h-10 w-10 rounded-full" />
        </div>
        <div className=" py-4 px-16 flex md:flex-row flex-col">
          <div className="md:w-1/2">Progress</div>
          <div className="md:w-1/2">
            <div className="mb-4">Self Assesment Readyness</div>
            <div className="bg-white rounded-lg px-2 py-4 flex md:flex-row flex-col items-center h-60">
              <div className="flex justify-center md:w-1/2">
                <CircleProgress percentage="60" />
              </div>
              <div className="flex flex-col md:w-1/2 text-center md:text-left">
                <span className="mb-2">You're 65% more likely to get the job than other candidates!</span>
                <span>Aim for 85% or higher!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
