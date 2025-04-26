import React, { useState } from 'react';
import { ChevronRight, Save, X } from 'lucide-react';

const AccountSection = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    gender: 'male',
    birthdate: '',
    language: 'english'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    console.log('Updated profile data:', formData);
    alert('Profile information updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: userData?.name || '',
      email: userData?.email || '',
      phone: userData?.phone || '',
      gender: 'male',
      birthdate: '',
      language: 'english'
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Section Header */}
      <div className="p-5 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Account Settings</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            Edit
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Personal Information</h3>
            </div>

            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              ) : (
                <p className="text-gray-800">{userData?.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              {isEditing ? (
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              ) : (
                <p className="text-gray-800">{userData?.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              {isEditing ? (
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              ) : (
                <p className="text-gray-800">{userData?.phone}</p>
              )}
            </div>

            {/* Gender Field - Only shown in edit mode */}
            {isEditing && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer Not to Say</option>
                </select>
              </div>
            )}

            {/* Birthdate Field - Only shown in edit mode */}
            {isEditing && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                  type="date" 
                  name="birthdate" 
                  value={formData.birthdate} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {/* Preferences Section */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Preferences</h3>
            </div>

            {/* Language Preference */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Language</label>
              {isEditing ? (
                <select 
                  name="language" 
                  value={formData.language} 
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="tamil">Tamil</option>
                  <option value="telugu">Telugu</option>
                  <option value="marathi">Marathi</option>
                </select>
              ) : (
                <p className="text-gray-800 capitalize">{formData.language}</p>
              )}
            </div>
          </div>

          {/* Security Section - Non-Editable */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Security</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Password</h4>
                    <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <button type="button" className="text-primary text-sm flex items-center">
                    Change <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h4>
                    <p className="text-xs text-gray-500">Not enabled</p>
                  </div>
                  <button type="button" className="text-primary text-sm flex items-center">
                    Enable <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Action Buttons - Only shown in edit mode */}
        {isEditing && (
          <div className="p-5 border-t border-gray-100 flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center gap-1 hover:bg-gray-50"
            >
              <X size={16} />
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-1 hover:bg-primary/90"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AccountSection; 