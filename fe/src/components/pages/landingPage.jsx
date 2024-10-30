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

function LandingPage() {
  return (
    <div>
      <Header></Header>
      <Branding></Branding>
      <StartConseling></StartConseling>
      <LayananKonsultasi></LayananKonsultasi>
      <Testimoni>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
        <TestimoniItem image="branding1.png" name="Anton" position="Backend Engineer">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio et quas quia nemo eos similique alias voluptatum laboriosam eaque. Libero a numquam reiciendis, incidunt nesciunt atque doloremque quis nobis repellat!
        </TestimoniItem>
      </Testimoni>
      <div className=" flex justify-center mb-10">
        <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
          Konsultasi Sekarang
        </button>
      </div>
      <AboutAndi></AboutAndi>
      <Faq>
        <FaqItem question="qergdf" description="asdfsdlkjfdhahja" />
        <FaqItem question="qergdf" description="asdfsdlkjfdhahja" />
        <FaqItem question="qergdf" description="asdfsdlkjfdhahja" />
      </Faq>
      <Footer></Footer>
    </div>
  );
}

export default LandingPage;
