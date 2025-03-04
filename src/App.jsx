import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import RegistraionPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import ProfileUpdate from './pages/UpdateProfilePage'

function App() { 

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/registration" element={<RegistraionPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/profile/update/:userId" element={<ProfileUpdate />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
