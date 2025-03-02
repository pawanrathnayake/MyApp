import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectToLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className='bg-white p-8 rounded-lg w-[400px] my-20'>
        {errorMessage && <p className="text-red-500 text-sm text-center mb-2">{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-3'>
            
            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>First Name*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="text"
                {...register('firstName', { required: "First Name is required" })}
              />
              {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
            </div>

            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>Last Name*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="text"
                {...register('lastName', { required: "Last Name is required" })}
              />
              {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
            </div>

            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>Email*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="email"
                {...register('email', { required: "Email is required", pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>Password*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="password"
                {...register('password', { required: "Password is required" })}
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
            </div>

            <div className='flex items-center space-x-3'>
              <label className='text-sm font-medium text-gray-700 w-1/3'>Confirm*</label>
              <input
                className='w-2/3 p-2 border border-black rounded focus:outline-none focus:ring-1 focus:ring-black'
                type="password"
                {...register('confirmPassword', { required: "Confirm Password is required", validate: value => value === password || "Passwords do not match" })}
              />
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
            </div>

          </div>

          <div className="flex items-center space-x-3 mt-4">
            <div className="w-1/3"></div> {/* Keeps alignment with other labels */}
            <button 
              type="submit"
              className="w-2/5 bg-black text-white py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </div>
        </form>

        {/* Login Redirect Button */}
        <div className="register-redirect text-center">
          <button 
            onClick={handleRedirectToLogin} 
            className="mt-4 text-black py-2 px-4 rounded hover:bg-blue-700">
            Already have an account? Login here
          </button>
        </div>

      </div>
    </div>
  );
};

export default Registration;
