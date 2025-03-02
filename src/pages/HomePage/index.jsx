import React from 'react';
import Header from "../../components/Header";
import Login from '../../components/Forms/Login';

const HomePage = () => {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 relative'>
        <Header />
        <h1 className='text-5xl text-center "absolute bottom-0 left-0 ... '>Welcome to <b>myApp</b></h1>
        <Login />
      </div>
    </>
  )
}

export default HomePage