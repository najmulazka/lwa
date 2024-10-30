import Button from '../elements/Button';

function Branding() {
  return (
    <div id="branding" className="py-6 md:py-14 px-8 md:px-24 border">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <div className="mb-3 flex items-center">
            <a href="https://www.instagram.com/learnwithandi" target="_blank" className="space-x-2">
              <i className="fas fa-arrow-right"></i>
              <span className="text-blue-500">LearnWIthAndi Instagram</span>
              <i className="fab fa-instagram text-pink-500"></i>
            </a>
          </div>

          <p className="text-3xl md:text-5xl font-bold mb-3 w-4/5 leading-tight md:leading-tight">Raih Potensi Karier Kamu dengan LearnWithAndi</p>
          <p className="text-sm md:text-lg">Elevating Career Consultation Services for the Modern</p>
          <p className="mb-8 text-xs md:text-lg">Professional</p>
          <div className="flex space-x-2">
            <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
              Konsultasi Sekarang
            </button>
            <a href="#about">
              <Button variant="white" variantHover="black" textHover="white" textColor="black">
                Siapa Andi?
              </Button>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[360px] md:h-[530px] flex flex-col relative">
          <div className="flex flex-row">
            <div className="w-1/2 rounded-xl ml-4 md:ml-6 bg-orange-300">
              <img src="/ilustration1.png" alt="branding1" />
            </div>
            <div className="w-1/2">
              <div className="bg-white px-3 py-1 rounded-md shadow-md mt-10 md:mt-14 inline-flex items-center md:ml-6">
                <i className="fa-duotone fa-solid fa-square mr-2 text-gray-500"></i>
                <span>Roasting CV & Linkedin</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row absolute bottom-0">
            <div className="w-1/2">
              <div className="bg-white px-3 py-1 rounded-md shadow-md mt-24 inline-flex items-center">
                <i className="fa-duotone fa-solid fa-square mr-2 text-gray-500"></i>
                <span>Roasting CV & Linkedin</span>
              </div>
            </div>
            <div className="w-1/2 rounded-xl mr-4 md:mr-10 bg-blue-300">
              <img src="/ilustration2.png" alt="branding1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branding;
