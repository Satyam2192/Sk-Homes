import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`https://sk-home-backend.onrender.com/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
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


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" onSubmit={handleSubmit} >
            <div>
              <label className="block text-gray-700">User Name</label>
              <input
                type='text'
                placeholder='username'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                id='username'
                onChange={handleChange}
              />
            </div>

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
              {loading ? 'Loading...' : 'Sign Up'}
            </button>

          </form>


          <hr className="my-6 border-gray-300 w-full" />

          <OAuth />

          <p className="mt-8">Have an account <Link to={'/sign-in'} className="text-blue-500 hover:text-blue-700 font-semibold">Log In</Link></p>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>

      </div>

    </section>

  );
}
