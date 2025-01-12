import { Link, useNavigate } from 'react-router-dom';
import Nav from '../elements/Nav';
import { useState } from 'react';
import { loginUser } from '../../services/auth.service';
import { CookiesKey, CookiesStorage } from '../../utils/cookies';
import { getSelfCheckProfessions } from '../../services/selfCheckProfession.service';

function LoginUser() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_URL}/auth/google`;
  };
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email?.value,
      password: event.target.password?.value,
    };

    try {
      const user = await loginUser(data);
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      CookiesStorage.set(CookiesKey.AuthToken, user.token);
      const check = await getSelfCheckProfessions();

      if (check.length <= 0) {
        navigate('/user/dream-job');
      } else {
        navigate('/user');
      }
    } catch (err) {
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      setLoginFailed(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col px-10 md:px-24 pt-5 md:pt-10 md:w-1/2 h-screen">
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 md:h-14 mb-10 md:mb-10" />
        </a>

        <h2 className="font-bold mb-20 md:mb-10">
          <span>Login and Continue Your Career Journey with LearnWithAndi!</span>
        </h2>

        {loginFailed && <div className="text-red-500 text-center">{loginFailed}</div>}
        <form action="" method="post" className="flex flex-col space-y-2 mb-2" onSubmit={handleSubmit}>
          <input type="email" name="email" id="email" placeholder="email" className="flex w-full px-2 py-1 border border-black rounded-md" />
          <input type="password" name="password" id="password" placeholder="password" className="flex w-full px-2 py-1 border border-black rounded-md" />
          <button type="submit" className="flex w-full justify-center py-2 border text-xl bg-black border-black text-white font-bold rounded-md hover:bg-white hover:text-black">
            Login
          </button>
        </form>

        {/* <a href="/user"> */}
        <button
          className="text-xs md:text-base font-semibold py-1 px-2 md:py-2 md:px-4 border border-2 border-black rounded-lg flex items-center justify-center space-x-2 hover:bg-black hover:text-white"
          type="button"
          onClick={handleGoogleLogin}>
          <img src="google-icon.png" alt="" />
          <span>Sign In With Google</span>
        </button>
        <div className="text-center">
          Don&#39;t Have account?
          <Link to="/register">
            <span className="text-blue-500 cursor-pointer hover:text-blue-700"> Sign Up</span>
          </Link>
        </div>

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
