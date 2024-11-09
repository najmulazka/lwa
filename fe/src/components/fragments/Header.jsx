import Button from '../elements/Button';
import Nav from '../elements/nav';

function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white py-1 px-2 md:py-2 md:px-16 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between font-semibold flex-wrap">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
        </a>
        <div>
          <Nav></Nav>
        </div>
        <div className='flex space-x-2'>
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
      </nav>
    </header>
  );
}

export default Header;
