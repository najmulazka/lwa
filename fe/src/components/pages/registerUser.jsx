import { Link, useNavigate } from 'react-router-dom';
import Nav from '../elements/Nav';
import { registerUser } from '../../services/auth.service';
import { useState } from 'react';

function RegisterUser() {
  const navigate = useNavigate();
  const [registerFailed, setRegisterFailed] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name?.value,
      email: event.target.email?.value,
      password: event.target.password?.value,
    };

    try {
      await registerUser(data);
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      navigate('/login');
    } catch (err) {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      setRegisterFailed(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col px-10 md:px-24 pt-5 md:pt-10 md:w-1/2 h-screen">
        <a href="/">
          <img src="/logo.png" alt="" className="h-8 md:h-14 mb-10 md:mb-10" />
        </a>

        <h2 className="font-bold mb-20 md:mb-10">
          <span>Sign Up and Continue Your Career Journey with LearnWithAndi!</span>
        </h2>

        {registerFailed && <div className="text-red-500 text-center">{registerFailed}</div>}
        <form action="" method="post" className="flex flex-col space-y-2 md:mb-2" onSubmit={handleSubmit}>
          <input type="text" name="name" id="name" placeholder="Full Name" className="flex w-full px-2 py-1 border border-black rounded-md" />
          <div className="flex flex-row space-x-2">
            <input type="email" name="email" id="email" placeholder="Email" className="flex w-full px-2 py-1 border border-black rounded-md" />
            <input type="password" name="password" id="password" placeholder="Password" className="flex w-full px-2 py-1 border border-black rounded-md" />
          </div>
          <button type="submit" className="flex w-full justify-center py-2 border text-xl bg-black border-black text-white font-bold rounded-md hover:bg-white hover:text-black">
            Sign Up
          </button>
        </form>

        <div className="text-center">
          Have account?
          <Link to="/login">
            <span className="text-blue-500 cursor-pointer"> Login</span>
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

export default RegisterUser;
