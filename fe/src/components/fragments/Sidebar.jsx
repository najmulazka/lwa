import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-black';
  };

  return (
    <div className="md:w-80 h-screen md:py-4 md:px-16 border-r-2 border-gray-200 bg-white fixed left-0">
      <div className="mb-6">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="h-15" />
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/user`} className={isActive(`/user`)}>
          Dashboard
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/user/landing-job`} className={isActive(`/user/landing-job`)}>
          Landing a Job
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/user/linkedin-profile`} className={isActive(`/user/linkedin-profile`)}>
          Linkedin Profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
