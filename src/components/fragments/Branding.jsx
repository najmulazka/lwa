import Button from '../elements/Button';

function Branding() {
  return (
    <div className="p-16 border">
      <div className="flex">
        <div className="w-1/2">
          <div className="mb-3">
            <i className="fas fa-arrow-right"></i>
            <a href="" className="text-blue-500">
              LearnWIthAndi Instagram
            </a>
            <i className="fab fa-instagram text-pink-500"></i>
          </div>
          <p className="text-5xl font-bold mb-3">Raih Potensi Karier</p>
          <p className="text-5xl font-bold mb-3">Kamu dengan</p>
          <p className="text-5xl font-bold mb-3">LearnWithAndi</p>
          <p>Elevating Career Consultation Services for the Modern</p>
          <p className="mb-8">Professional</p>
          <div className="flex space-x-2">
            <Button>Konsultasi Sekarang</Button>
            <Button variant="white" variantHover="black" textHover="white" textColor="black">
              Siapa Andi?
            </Button>
          </div>
        </div>
        <div className="w-1/2 bg-blue-500 flex flex-wrap relative">
          <img src="/branding1.png" alt="branding1" className="w-1/2 rounded-xl ml-6 " />
          <div className="w-1/2 relative">
            <div className=" absolute bg-white inline-block px-3 py-1 rounded-md border-grey-300 shadow-md">Roasting CV & Linkedin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Branding;
