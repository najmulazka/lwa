function AboutAndi() {
  return (
    <div id="about" className="flex flex-col md:flex-row items-center md:items-start py-6 md:py-14 px-8 md:px-24">
      <div className="w-full md:w-1/2 flex md:flex-col flex-col-reverse justify-center md:justify-start mb-4 md:mb-0">
        <img src="/branding1.png" alt="Andi Satriawan Lubis" className="rounded-lg w-full object-cover shadow-lg" />

        <div className="mt-6">
          <p className="text-lg font-bold">Andi Satriawan Lubis</p>
          <p className="text-gray-600">Career Coach | International Recruiter | 7 Years in Career Development & Partnerships</p>
        </div>
      </div>

      <div className="w-full md:w-2/3 md:pl-6 md:pt-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Meet Andi, Your Career Coach!</h1>
        <p className="text-gray-700 mb-6 text-justify">
          Andi is a dedicated professional with expertise in People Development . Committed to guiding and supporting boot camp students, I share valuable insights and industry knowledge for their growth. Let's connect and create a network
          of learners and industry experts. Reach out for advice or collaboration opportunities. Together, let's inspire success!
        </p>
        <div className="space-y-4">
          <div className="flex space-x-2 border shadow-md p-2 font-semibold  rounded-lg ">
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

export default AboutAndi;
