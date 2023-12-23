import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess,  signInFailure} from '../redux/user/userSlice.js'
import { OAuth } from '../components/OAuth.jsx';
import backgroundImage from '../images/homebg2.jpg';

export const Signin = () => {
  const [formData, setFormData] = useState({})
  const {loading, error} = useSelector((state)=> state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch ('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
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
    <div className="min-h-screen py-7 ">
      <div className='container mx-auto'>
      <div className='flex flex-col border lg:flex-row w-10/12 lg:w-9/12 rounded-xl bg-white mx-auto shadow-2xl overflow-hidden'>
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-center font-semibold m-4 text-3xl">Sign in</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
              <label>Email: </label>
              <input 
                type="email" 
                placeholder="email" 
                className="border p-3 rounded-lg" 
                id='email' 
                onChange={handleChange}/>
              <label>Password: </label>
              <input 
                type="password" 
                placeholder="password" 
                className="border p-3 rounded-lg" 
                id='password' 
                min={8}
                onChange={handleChange}/>
            <button 
              disabled={loading} 
              className="bg-slate-700 text-white p-3 
              rounded-lg uppercase hover:opacity-90">
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth/>
          </form>
          <div className='flex gap-4 mt-5'>
            <p>Dont have an account?</p>
            <Link to={"/sign-up"}>
              <span className='text-blue-600'>Sign up</span>
            </Link>
          </div>
          {error && <p className='text-red-600 mt-5'>{error}</p>}
        </div>
        <div className='w-full lg:w-1/2 flex flex-col items-center justify-center bg-no-repeat bg-cover bg-center' 
        style={{
          backgroundImage: `url(${backgroundImage})`}}>
        </div>
      </div>
      </div>
    </div>
  )
}
