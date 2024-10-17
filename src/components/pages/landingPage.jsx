import Header from '../fragments/Header';
import Branding from '../fragments/Branding';
import StartConseling from '../fragments/StartConseling';
import LayananKonsultasi from '../fragments/LayananKonsultasi';
import Testimoni from '../fragments/Testimoni';
import Button from '../elements/Button';
import AboutAndi from '../fragments/AboutAndi';
import Footer from '../fragments/Footer';

function LandingPage() {
  return (
    <div>
      <Header></Header>
      <Branding></Branding>
      <StartConseling></StartConseling>
      <LayananKonsultasi></LayananKonsultasi>
      <Testimoni></Testimoni>
      <div className=" flex justify-center mb-10">
        <Button>Konsultasi Sekarang</Button>
      </div>
      <AboutAndi></AboutAndi>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
