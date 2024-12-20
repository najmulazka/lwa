import Nav from '../elements/nav';

function Footer() {
  return (
    <footer className="bg-gray-300 py-4 px-2 md:py-6 md:px-16 shadow-md text-xs md:text-lg">
      <nav className="flex flex-col md:flex-row md:items-center justify-between font-semibold space-y-4 md:space-y-0">
        <div className="flex justify-between items-center">
          <a href="/">
            <img src="/logo.png" alt="Logo" className="h-8 md:h-14" />
          </a>
          <div className="flex space-x-4 md:hidden block">
            <a href="https://www.linkedin.com/company/learn-with-andi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://www.instagram.com/learnwithandi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:justify-start bg-transparent space-y-2 md:space-y-0 md:space-x-6 md:text-center md:text-left md:text-base text-xs font-medium">
          <a href="/" className="hover:text-gray-500">
            Beranda
          </a>
          <a href="/#services" className="hover:text-gray-500">
            Services
          </a>
          <a href="/#testimoni" className="hover:text-gray-500">
            Testimoni
          </a>
          <a href="/#about" className="hover:text-gray-500">
            About
          </a>
        </div>

        <div className="hidden md:block flex md:justify-end md:mt-0 space-x-4">
          <a href="https://www.linkedin.com/company/learn-with-andi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/learnwithandi" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </nav>

      {/* Footer Text */}
      <div className="text-left mt-4">
        <span className="text-gray-500">© LearnWithAndi 2024. All right reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
