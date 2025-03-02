import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Basic Details');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        setError('Error fetching profile data');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL, token, navigate]);

  if (loading) return <div className="text-center text-lg font-semibold">Loading profile data...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const tabs = ['Basic Details', 'Additional Details', 'Personal Preferences'];
  if (profileData?.maritalStatus === 'Married') {
    tabs.splice(2, 0, 'Spouse Details'); // Insert 'Spouse Details' if married
  }

  return (
    <div className="min-h-screen flex justify-center p-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg flex relative">
        {/* Vertical Tabs */}
        <div className="w-1/4 border-r pr-4">
          <h2 className="text-xl font-bold mb-4">My Profile</h2>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left px-4 py-2 mb-2 text-lg font-medium rounded-lg ${activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-3/4 pl-6">
          {/* Edit Profile & Logout Buttons */}
          <div className="absolute top-4 right-4 flex space-x-4">
            <Link
              to={`/profile/update/${profileData?._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600"
            >
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {activeTab === 'Basic Details' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Basic Details</h3>
              <p><strong>Salutation:</strong> {profileData?.salutation}</p>
              <p><strong>First Name:</strong> {profileData?.firstName}</p>
              <p><strong>Last Name:</strong> {profileData?.lastName}</p>
              <p><strong>Email:</strong> {profileData?.email}</p>
            </div>
          )}

          {activeTab === 'Additional Details' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Additional Details</h3>
              <p><strong>Home Address:</strong> {profileData?.homeAddress}</p>
              <p><strong>Postal Code:</strong> {profileData?.postalCode}</p>
              <p><strong>Marital Status:</strong> {profileData?.maritalStatus}</p>
              <p><strong>Country:</strong> {profileData?.country}</p>
            </div>
          )}

          {activeTab === 'Spouse Details' && profileData?.maritalStatus === 'Married' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Spouse Details</h3>
              <p><strong>Spouse Name:</strong> {profileData?.spouseFirstName} {profileData?.spouseLastName}</p>
            </div>
          )}

          {activeTab === 'Personal Preferences' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Preferences</h3>
              <p><strong>Hobbies:</strong> {profileData?.hobbies}</p>
              <p><strong>Favorite Sport:</strong> {profileData?.favoriteSport}</p>
              <p><strong>Preferred Music:</strong> {profileData?.preferredMusic}</p>
              <p><strong>Preferred Movies/TV Shows:</strong> {profileData?.preferredMovies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
