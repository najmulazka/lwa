import Nav from '../elements/nav';
function LoginUser() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col px-10 md:px-24 pt-5 md:pt-10 md:w-1/2 h-screen">
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 md:h-14 mb-10 md:mb-14" />
        </a>

        <div className="text-3xl md:text-4xl font-bold mb-20 md:mb-14">
          <span>Yuk, Masuk dan Lanjutkan Perjalanan Kariermu dengan LearnWithAndi!</span>
        </div>

        {/* <a href="/user"> */}
        <button className="inline font-bold py-1 px-2 md:py-2 md:px-4 border border-2 border-black rounded-lg space-x-2 hover:bg-black hover:text-white" type="button" onClick={handleGoogleLogin}>
          <i className="fa-brands fa-google text-pink-500"></i>
          <span>Masuk Dengan Google</span>
        </button>

        {/* </a> */}

        <div className="md:fixed bottom-10 text-semibold absolute">
          <Nav></Nav>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2">
        <img src="/login.png" alt="image" className=" md:h-screen w-full" />
      </div>
    </div>
  );
}

export default LoginUser;
