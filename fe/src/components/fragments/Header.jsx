import Button from '../elements/Button';
import Nav from '../elements/nav';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white py-1 px-2 md:py-2 md:px-16 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between font-semibold flex-wrap">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
        </a>
        <div>
          <Nav></Nav>
        </div>
        <a href="/login">
          <Button variant="black" variantHover="white" textHover="black" textColor="white">
            Login
          </Button>
        </a>
      </nav>
    </header>
  );
}

export default Header;
