import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import Nav from '../elements/nav';
import { usera } from '../../services/whoami.service';

function Header() {
  const [profile, setProfile] = useState('');
  const [isLogin, setIslogin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usera();
        setProfile(data.profilePicture);
        setIslogin(true);
      } catch (err) {
        console.log(err);
        setIslogin(false);
      }
    };
    fetchData();
  }, []);
  return (
    <header className="sticky top-0 z-10 bg-white py-1 px-4 md:py-2 md:px-120 px-4 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between font-semibold flex-wrap">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
        </a>
        <div>
          <Nav></Nav>
        </div>
        {!isLogin && (
          <div className="flex space-x-2">
            <a href="/login">
              <Button variant="white" variantHover="black" textHover="white" textColor="black">
                Sign In
              </Button>
            </a>
            <a href="/Booking">
              <Button variant="black" variantHover="white" textHover="black" textColor="white">
                Book Consultation
              </Button>
            </a>
          </div>
        )}
        {isLogin && (
          <div className="flex space-x-2">
            <a href="/Booking" className="font-semibold flex items-center text-orange-500 hover:text-orange-300 py-1 md:py-2 md:px-4 px-2 text-xs md:text-base">
              Book Consultation
            </a>
            <a href="/user">
              <img src={profile} alt="profile" className="border border-gray-500 md:h-12 md:w-12 rounded-full" />
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
