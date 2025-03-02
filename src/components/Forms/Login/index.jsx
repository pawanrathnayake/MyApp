import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'https://my-app-backend-wmzc.onrender.com/api/login',
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        if (data.keepLoggedIn) {
          document.cookie = "keepLoggedIn=true; max-age=31536000; path=/";
        }
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-form flex items-center justify-center">
      <div className='bg-white p-8 rounded-lg w-[400px] my-20'>
        {errorMessage && <p className="error text-red-500">{errorMessage}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>Email*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="text"
                {...register('email', { required: "Email is required" })}
              />
              {errors.email && <span className="error text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className='flex items-center space-x-3'> 
              <label className='text-sm font-medium text-gray-700 w-1/3'>Password*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="password"
                {...register('password', { required: "Password is required" })}
              />
              {errors.password && <span className="error text-red-500 text-xs">{errors.password.message}</span>}
            </div>
          </div>

          <div className='flex items-center space-x-3 mt-2'>
            <div className="w-1/3"></div>
            <input
              className="w-4 h-4 border border-black rounded focus:ring-1 focus:ring-black"
              type="checkbox"
              {...register('keepLoggedIn')}
            />
            <label className="text-sm font-medium text-gray-700">Keep me logged in</label>
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <div className="w-1/3"></div>
            <button 
              className="w-2/5 bg-black text-white py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
              type="submit"
              disabled={Object.keys(errors).length !== 0}
            >
              LOGIN
            </button>
          </div>
        </form>

        <div className="register-redirect">
          <button 
            onClick={() => navigate('/registration')} 
            className="mt-4 text-black py-2 px-4 rounded hover:bg-blue-700">
            No account? Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
