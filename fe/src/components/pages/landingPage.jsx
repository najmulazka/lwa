import PropTypes from 'prop-types';
import Button from '../elements/Button';
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';
import FaqItem from '../elements/FaqItem';
import TestimoniItem from '../elements/TestimoniItem';
import { useEffect, useState } from 'react';
import { getTestimonials } from '../../services/testimoni.service';
import { getFaq } from '../../services/faq.service';

function LandingPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    getTestimonials((status, res) => {
      setTestimonials(res.data.data);
    });
  }, []);

  useEffect(() => {
    getFaq((status, res) => {
      setFaq(res.data.data);
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
            Consult Now!
          </button>
        </a>
      </div>
      <AboutAndi></AboutAndi>
      <Faq>{faq.length > 0 && faq.map((faq) => <FaqItem key={faq.id} question={faq.question} description={faq.description} />)}</Faq>
      <Footer></Footer>
    </div>
  );
}

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

          <p className="text-3xl md:text-5xl font-bold mb-3 w-4/5 leading-tight md:leading-tight">Land Your Dream Job in 90 Days with LearnWithAndi</p>
          <p className="text-sm md:text-lg">Elevating Career Consultation Services for the Modern</p>
          <p className="mb-8 text-xs md:text-lg">Professional</p>
          <div className="flex space-x-2">
            <a href="/booking">
              <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
                Consult Now!
              </button>
            </a>

            <a href="#about">
              <Button variant="white" variantHover="black" textHover="white" textColor="black">
                Who is Andi?
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

function StartConseling() {
  return (
    <div className="bg-gray-200 py-6 md:py-14 px-8 md:px-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-3">How To Start Counseling</h1>
      <p className="text-center mb-10 md:w-3/5">Starting your career journey with LearnWithAndi is simple. Follow these steps to book a personalized counseling session, anytime and anywhere.</p>

      <div className="md:grid grid-cols-3 space-x-3">
        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling1.png" alt="image" className="h-60" />
          </div>
          <h1 className="text-xl text-center mb-2">Book a session</h1>
          <p className="text-center text-sm">Choose a time that works best for you through the online schedule, with IDR 150,000 per session</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-indigo-300  rounded-lg">
            <img src="/startConseling2.png" alt="image" className="h-60" />
          </div>
          <h1 className="text-xl text-center mb-2">Drop Your CV Via LinkdIn Chat</h1>
          <p className="text-center text-sm">Send your CV and essential information to provide a better understanding of your background and situation</p>
        </div>

        <div className="flex flex-col items-center md:mb-0 mb-10">
          <div className="bg-amber-200  rounded-lg">
            <img src="/startConseling3.png" alt="image" className="h-60" />
          </div>
          <h1 className="text-xl text-center mb-2">Join Video Call Session</h1>
          <p className="text-center text-sm">Join a one-on-one video call with andi to discuss your career goals and challenges</p>
        </div>
      </div>
    </div>
  );
}

function LayananKonsultasi() {
  return (
    <div id="services" className="py-6 md:py-14 px-8 md:px-24 flex flex-col">
      <h1 className="text-3xl font-bold w-full md:w-1/2 leading-tight">Boost Your Career with Comprehensive Consulting Services from LearnWithAndi</h1>
      <div className="flex flex-col-reverse md:flex-row ">
        <div className=" flex flex-col mt-14">
          <div className="w-full md:w-4/5">
            <ListLayanan title="Train Your Students">Guide students with proven strategies to prepare them for future career challenges.</ListLayanan>
            <ListLayanan title="Personalized Career Consultation">Career guidance designed to help you craft strategies and achieve your career goals.</ListLayanan>
            <ListLayanan title="Optimize Your CV for Recruiters">Get support to highlight your experience and skills in the most effective way.</ListLayanan>
            <ListLayanan title="Job Interview Preparation Consultation">Get tailored support to confidently showcase your skills and experience in the best possible way.</ListLayanan>
          </div>
        </div>
        <div className="mt-5 md:mt-0">
          <img src="/services.png" alt="image" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function ListLayanan(props) {
  const { title, children } = props;
  return (
    <div className="mb-5 md:mb-10">
      <div className="border shadow-md inline-block rounded-md py-1 px-2 font-semibold mb-2">
        <div className="inline mr-2">
          <i className="fa-duotone fa-solid fa-square text-gray-500"></i>
        </div>
        <p className="inline">{title}</p>
      </div>
      <div className="text-justify">{children}</div>
    </div>
  );
}

function Testimoni(props) {
  const { children } = props;
  return (
    <div className="flex flex-col py-6 md:py-14">
      <div className="text-3xl font-bold mb-10 text-center">What They Say About LearnWithAndi</div>
      <div className="flex justify-center overflow-x-auto space-x-4">{children}</div>
    </div>
  );
}

function AboutAndi() {
  return (
    <div id="about" className="flex flex-col md:flex-row items-center md:items-start py-6 md:py-14 px-8 md:px-24">
      <div className="w-full md:w-1/2 flex md:flex-col flex-col-reverse justify-center md:justify-start mb-4 md:mb-0">
        <img src="/about.png" alt="Andi Satriawan Lubis" className="rounded-lg w-full object-cover shadow-lg" />

        <div className="mt-6">
          <p className="text-lg font-bold">Andi Satriawan Lubis</p>
          <p className="text-gray-600">Career Coach | International Recruiter | 7 Years in Career Development & Partnerships</p>
        </div>
      </div>

      <div className="w-full md:w-2/3 md:pl-6 md:pt-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Meet Andi, Your Career Coach!</h1>
        <p className="text-gray-700 mb-6 text-justify">
          Andi is a dedicated professional with expertise in People Development . Committed to guiding and supporting boot camp students, I share valuable insights and industry knowledge for their growth. Let&apos;s connect and create a
          network of learners and industry experts. Reach out for advice or collaboration opportunities. Together, let&apos;s inspire success!
        </p>
        <div className="space-y-4">
          <div className="flex space-x-2 border shadow-md p-2 font-semibold rounded-lg ">
            <i className="fas fa-check-circle text-blue-500 mt-1"></i>
            <span className="text-gray-700">7 years experience on Tech Education, Recruitment, and Career Support</span>
          </div>
          <div className="flex space-x-2 border shadow-md p-2 font-semibold rounded-lg">
            <i className="fas fa-check-circle text-blue-500 mt-1"></i>
            <span className="text-gray-700">Helping more than 1,000 students from 3 big bootcamps to get a job</span>
          </div>
        </div>

        <div className="flex mt-6 space-x-4">
          <a href="https://www.linkedin.com/company/learn-with-andi" target="_blank" className="text-blue-700 hover:text-blue-900">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/learnwithandi" target="_blank" className="text-pink-500 hover:text-pink-700">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function Faq(props) {
  const { children } = props;
  return (
    <div className="py-6 md:py-14 px-8 md:px-24 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold mb-3">Frequently Asked Questions (FAQ)</h1>
      <div className="md:w-3/5 md:mb-20 mb-10">
        <p className="text-center">You may have some questions before getting started. Here are answers to some frequently asked questions about LearnWithAndi&apos;s services</p>
      </div>

      <div className="w-full md:grid md:grid-cols-2">{children}</div>
    </div>
  );
}

ListLayanan.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

Testimoni.propTypes = {
  children: PropTypes.bool.isRequired,
};

Faq.propTypes = {
  children: PropTypes.bool.isRequired,
};

export default LandingPage;
