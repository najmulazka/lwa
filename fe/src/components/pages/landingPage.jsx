import Header from '../fragments/Header';
import Branding from '../fragments/Branding';
import StartConseling from '../fragments/StartConseling';
import LayananKonsultasi from '../fragments/LayananKonsultasi';
import Testimoni from '../fragments/Testimoni';
import AboutAndi from '../fragments/AboutAndi';
import Footer from '../fragments/Footer';
import Faq from '../fragments/Faq';
import FaqItem from '../elements/FaqItem';
import TestimoniItem from '../elements/TestimoniItem';
import { useEffect, useState } from 'react';
import { getTestimonials } from '../../services/testimoni.service';
import { getFaq } from '../../services/faq.service';

function LandingPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    getTestimonials((data) => {
      setTestimonials(data.data);
    });
  }, []);

  useEffect(() => {
    getFaq((data) => {
      setFaq(data.data);
    });
  }, []);

  return (
    <div>
      <Header></Header>
      <Branding></Branding>
      <StartConseling></StartConseling>
      <LayananKonsultasi></LayananKonsultasi>
      <Testimoni>
        {testimonials.length > 0 &&
          testimonials.map((testimoni) => (
            <TestimoniItem key={testimoni.id} image={testimoni.image} name={testimoni.name} position={testimoni.position}>
              {testimoni.description}
            </TestimoniItem>
          ))}
      </Testimoni>
      <div className=" flex justify-center mb-10">
        <a href="/booking">
          <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
            Konsultasi Sekarang
          </button>
        </a>
      </div>
      <AboutAndi></AboutAndi>
      <Faq>{faq.length > 0 && faq.map((faq) => <FaqItem key={faq.id} question={faq.question} description={faq.description} />)}</Faq>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
