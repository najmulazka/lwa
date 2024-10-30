import { Link, useLocation } from 'react-router-dom';

function SidebarAdmin() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-black';
  };

  return (
    <div className="md:w-80 h-screen md:py-4 md:px-16 border-r-2 border-gray-200 bg-white fixed left-0">
      <div className="mb-6">
        <Link to="/admin">
          <img src="/logo.png" alt="Logo" className="h-15" />
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/admin`} className={isActive(`/admin`)}>
          Dashboard
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/admin/testimoni`} className={isActive(`/admin/testimoni`)}>
          Testimoni
        </Link>
      </div>
      <div className="py-2">
        <Link to={`/admin/faq`} className={isActive(`/admin/faq`)}>
          FAQ
        </Link>
      </div>
    </div>
  );
}

export default SidebarAdmin;
