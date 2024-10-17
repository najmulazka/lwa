function Footer() {
  return (
    <footer className="bg-gray-300 py-1 px-2 md:py-2 md:px-16 border-b-2 border-gray-300 shadow-md text-xs md:text-lg">
      <nav className="flex items-center justify-between font-semibold flex-wrap py-8">
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
        <div className="flex mt-6 space-x-4">
          <a href="#" className="hover:text-gray-500">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="#" className="hover:text-gray-500">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </nav>
      <span className='text-gray-500'>© LearnWithAndi 2024. All right reserved</span>
    </footer>
  );
}

export default Footer;
