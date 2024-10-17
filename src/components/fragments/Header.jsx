import Button from '../elements/Button';

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white py-1 px-2 md:py-2 md:px-16 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between font-semibold flex-wrap">
        <a href="/">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
        </a>
        <div className="flex justify-center space-x-1 md:space-x-6">
          <a href="" className="hover:text-gray-500">
            Beranda
          </a>
          <a href="" className="hover:text-gray-500">
            Services
          </a>
          <a href="" className="hover:text-gray-500">
            Testimoni
          </a>
          <a href="" className="hover:text-gray-500">
            About
          </a>
        </div>
        <Button variant="white" variantHover="black" textHover="white" textColor="black">
          Booking konsultasi
        </Button>
      </nav>
    </header>
  );
}

export default Header;
