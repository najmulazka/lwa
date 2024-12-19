import { useState } from 'react';
import { loginAdmin } from '../../../services/auth.service';
import Nav from '../../elements/nav';
import { useNavigate } from 'react-router-dom';

function LoginAdmin() {
  const [loginFailed, setLoginFailed] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    await loginAdmin(email, password, navigate, setLoginFailed);
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="px-10 lg:px-24 pt-5 lg:pt-10 lg:w-1/2 h-screen">
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 lg:h-14 mb-10 lg:mb-14" />
        </a>

        <div className="text-3xl lg:text-4xl font-bold mb-20 lg:mb-14">
          <span>Sign In Admin LWA</span>
        </div>

        <form action="" method="post" onSubmit={handleLogin}>
          {loginFailed && <p className="text-red-500">{loginFailed}</p>}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              Email Address
            </label>
            <input type="email" name="email" id="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-500 w-full rounded-lg mb-6 py-2 px-4" />
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input type="password" name="password" id="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-500 w-full rounded-lg mb-6 py-2 px-4" />
          </div>
          <button className={`font-bold py-1 w-36 lg:py-2 lg:w-48 border border-2 border-black bg-black text-white rounded hover:bg-white hover:text-black`} type="submit">
            Sign In Admin
          </button>
        </form>

        <div className="lg:fixed bottom-10 text-semibold absolute">
          <Nav></Nav>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/2">
        <img src="/login.png" alt="image" className=" lg:h-screen w-full" />
      </div>
    </div>
  );
}

export default LoginAdmin;
