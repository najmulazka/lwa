import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PopupConfirmation from '../elements/PopupConfirmation';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';

function Sidebar(props) {
  const { role } = props;
  const navigate = useNavigate();
  const [isPopupLogout, setIsPopupLogout] = useState(false);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-black';
  };

  const handleLogoutClick = () => {
    setIsPopupLogout(true);
  };

  const handleConfirm = () => {
    navigate(role === 'admin' ? '/login-admin' : '/');
    role === 'admin' ? CookiesStorage.remove(CookiesKey.TokenAdmin) : CookiesStorage.remove(CookiesKey.AuthToken);
  };

  const handleCancel = () => {
    setIsPopupLogout(false);
  };

  const links =
    role === 'admin'
      ? [
          { path: '/admin', label: 'Dashboard' },
          { path: '/admin/testimoni', label: 'Testimoni' },
          { path: '/admin/faq', label: 'FAQ' },
          { path: '/admin/landing-job', label: 'Landing a Job' },
          { path: '/admin/linkedin-profile', label: 'Linkedin Profile' },
        ]
      : [
          { path: '/user', label: 'Dashboard', icon: '../dashboard-icon.svg' },
          { path: '/user/landing-job', label: 'Landing a Job', icon: '../landing-job-icon.svg' },
          { path: '/user/linkedin-profile', label: 'Linkedin Profile', icon: '../linkedin-profile-icon.svg' },
        ];

  return (
    <div>
      {isPopupLogout && <PopupConfirmation onConfirm={() => handleConfirm()} onCancel={handleCancel} type="logout" />}
      <div className="md:w-80 h-screen md:py-4 md:px-16 border-r-2 border-gray-200 bg-white fixed left-0">
        <div className="mb-6">
          <Link to={role === 'admin' ? '#' : '/'}>
            <img src="/logo.png" alt="Logo" className="h-15" />
          </Link>
        </div>
        {links.map((link) => (
          <div className="py-2" key={link.path}>
            <Link to={link.path} className={`flex space-x-2 ${isActive(link.path)}`}>
              {/* <img src={link.icon} alt={link.label} /> */}
              <div>{link.label}</div>
            </Link>
          </div>
        ))}
        <div className="fixed bottom-4">
          <button className="text-blue-500" onClick={() => handleLogoutClick()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
