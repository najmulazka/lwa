import Nav from '../elements/nav';
function LoginAdmin() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="px-10 md:px-24 pt-5 md:pt-10 md:w-1/2 h-screen">
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 md:h-14 mb-10 md:mb-14" />
        </a>

        <div className="text-3xl md:text-4xl font-bold mb-20 md:mb-14">
          <span>Admin LWA Login</span>
        </div>

        <form action="" method="post">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Alamat Email
            </label>
            <input type="email" name="email" id="email" placeholder="example@gmail.com" className="border border-gray-500 w-full rounded-lg mb-6 py-2 px-4" />
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input type="password" name="password" id="password" placeholder="**********" className="border border-gray-500 w-full rounded-lg mb-6 py-2 px-4" />
          </div>
        </form>

        <a href="/admin">
          <button className={`font-bold py-1 w-36 md:py-2 md:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="button">
            Login Admin
          </button>
        </a>

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

export default LoginAdmin;
