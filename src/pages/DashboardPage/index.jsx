import React from 'react';
import MyProfilePage from '../../components/Forms/Profile';
const Dashboard = () => {

  return (
    <div className="dashboard min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% relative">
      <h1 className='text-5xl text-center'>My <b>Profile</b></h1>
      <MyProfilePage />
    </div>
  );
};

export default Dashboard;
