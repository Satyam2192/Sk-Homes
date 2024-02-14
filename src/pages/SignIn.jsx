import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('https://sk-home-backend.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://source.unsplash.com/random/900x700/?villa" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Sign In</h1>

          <form className="mt-6" onSubmit={handleSubmit} >
            
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type='email'
                placeholder='email'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type='password'
                placeholder='password'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                id='password'
                onChange={handleChange}
              />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className='w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6'
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>

          </form>


          <hr className="my-6 border-gray-300 w-full" />

          <OAuth />

          <p className="mt-8">Have an account <Link to={'/sign-up'} className="text-blue-500 hover:text-blue-700 font-semibold">Sign up</Link></p>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>

      </div>

    </section>
  );
}