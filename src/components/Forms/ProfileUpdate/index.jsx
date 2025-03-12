import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfilePage = () => {
  // Try to get userId from URL params, then fallback to localStorage
  const { userId: paramUserId } = useParams();
  const storedUserId = localStorage.getItem("userId");
  const userId = paramUserId || storedUserId;

  const [profileData, setProfileData] = useState({
    profileImage: "",
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    spouseFirstName: "",
    spouseLastName: "",
    hobbies: "",
    favoriteSport: "",
    preferredMusic: "",
    preferredMovies: "",
    homeAddress: "",
    country: "",
    postalCode: "",
  });

  const [initialProfileData, setInitialProfileData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!userId) {
      setError("User ID is missing.");
      console.error("User ID is missing. Make sure it is stored or passed in the route.");
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
        setInitialProfileData(response.data); // Save initial data for reset
      } catch (error) {
        setError("Error fetching profile data");
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [API_URL, token, userId, navigate]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Preview Image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Form (Update Profile)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = profileData.profileImage;

      // Upload New Image If Selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const imageResponse = await axios.post(`${API_URL}/upload/profile-image`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });

        imageUrl = imageResponse.data.imageUrl;
      }

      // Update Profile Data
      await axios.put(
        `${API_URL}/user/${userId}`,
        { ...profileData, profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  // Reset to Initial Data
  const handleCancel = () => {
    setProfileData(initialProfileData);
  };

  // Navigate Back to Profile Page
  const handleGoBack = () => {
    navigate(`/dashboard`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center p-8 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg flex">

        {/* Sidebar Navigation */}
        <div className="w-1/4 border-r pr-4 flex flex-col items-center">
          {/* Profile Image Upload */}
          <div className="w-24 h-24 mb-4 relative">
            <img
              src={profileData?.profileImage || "https://placehold.co/150x150"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border border-gray-300 shadow-md"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* Navigation Tabs */}
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          {["Basic Details", "Additional Details", "Spouse Details", "Personal Preferences"].map((tab) =>
            profileData.maritalStatus === "Married" || tab !== "Spouse Details" ? (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left px-4 py-2 mb-2 text-lg font-medium rounded-lg ${activeTab === tab ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {tab}
              </button>
            ) : null
          )}
        </div>

        {/* Form Section */}
        <div className="w-3/4 pl-6">
          {error && <div className="text-red-500">{error}</div>}
          <form onSubmit={handleSubmit}>

            {/* Basic Details */}
            {activeTab === "Basic Details" && (
              <>
                <label>Salutation:</label>
                <select name="salutation" value={profileData.salutation} onChange={handleChange} className="w-full border p-2 rounded mb-2">
                  <option value="Mr">Mr.</option>
                  <option value="Mrs">Mrs.</option>
                  <option value="Miss">Miss.</option>
                  <option value="Dr">Dr.</option>
                </select>
                <label>First Name:</label>
                <input type="text" name="firstName" value={profileData.firstName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Last Name:</label>
                <input type="text" name="lastName" value={profileData.lastName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Email:</label>
                <input type="email" name="email" value={profileData.email} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
              </>
            )}

            {/* Additional Details */}
            {activeTab === "Additional Details" && (
              <>
                <label>Home Address:</label>
                <input type="text" name="homeAddress" value={profileData.homeAddress} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Country:</label>
                <input type="text" name="country" value={profileData.country} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Postal Code:</label>
                <input type="text" name="postalCode" value={profileData.postalCode} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <select name="maritalStatus" value={profileData.maritalStatus} onChange={handleChange} className="w-full border p-2 rounded mb-2">
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </>
            )}

            {/* Spouse Details */}
            {activeTab === "Spouse Details" && profileData.maritalStatus === "Married" && (
              <>
                <label>Spouse First Name:</label>
                <input type="text" name="spouseFirstName" value={profileData.spouseFirstName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Spouse Last Name:</label>
                <input type="text" name="spouseLastName" value={profileData.spouseLastName} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
              </>
            )}

            {/* Personal Preferences */}
            {activeTab === "Personal Preferences" && (
              <>
                <label>Hobbies:</label>
                <input type="text" name="hobbies" value={profileData.hobbies} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Favorite Sport:</label>
                <input type="text" name="favoriteSport" value={profileData.favoriteSport} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Preferred Music:</label>
                <input type="text" name="preferredMusic" value={profileData.preferredMusic} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
                <label>Preferred Movies/TV Shows:</label>
                <input type="text" name="preferredMovies" value={profileData.preferredMovies} onChange={handleChange} className="w-full border p-2 rounded mb-2" />
              </>
            )}

            <div className="flex gap-4 mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
              <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button type="button" onClick={handleGoBack} className="bg-green-500 text-white px-4 py-2 rounded">Go Back to Profile</button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default EditProfilePage;
