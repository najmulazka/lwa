function ScrollToSection({ menu }) {
  menu.current.scrollIntoView({ behavior: 'smooth' });
}

export default ScrollToSection;
