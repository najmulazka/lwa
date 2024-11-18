function Nav() {
  return (
    <div className="flex justify-between md:justify-start space-x-1 md:space-x-6 md:text-base text-xs font-medium">
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
  );
}

export default Nav;
