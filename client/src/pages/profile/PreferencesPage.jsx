import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Moon, Globe, Clock, Save } from 'lucide-react';

const PreferencesPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    notifications: {
      orderUpdates: true,
      promotions: false,
      serviceReminders: true
    },
    appearance: 'light',
    language: 'english',
    timeFormat: '12h'
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggle = (category, setting) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleChange = (setting, value) => {
    setPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setSuccessMessage('Preferences updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Preferences</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in-out">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Notification Preferences</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Order Updates</h3>
                  <p className="text-sm text-gray-500">Get notified about your order status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.notifications.orderUpdates}
                    onChange={() => handleToggle('notifications', 'orderUpdates')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Promotions & Offers</h3>
                  <p className="text-sm text-gray-500">Receive special offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.notifications.promotions}
                    onChange={() => handleToggle('notifications', 'promotions')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-700">Service Reminders</h3>
                  <p className="text-sm text-gray-500">Get reminders for scheduled services</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.notifications.serviceReminders}
                    onChange={() => handleToggle('notifications', 'serviceReminders')}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Moon className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Appearance</h2>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="appearance" 
                  value="light" 
                  checked={preferences.appearance === 'light'}
                  onChange={() => handleChange('appearance', 'light')}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">Light Mode</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="appearance" 
                  value="dark" 
                  checked={preferences.appearance === 'dark'}
                  onChange={() => handleChange('appearance', 'dark')}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">Dark Mode</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="appearance" 
                  value="system" 
                  checked={preferences.appearance === 'system'}
                  onChange={() => handleChange('appearance', 'system')}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">System Default</span>
              </label>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Language</h2>
            </div>
            
            <select 
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
              <option value="kannada">Kannada</option>
              <option value="malayalam">Malayalam</option>
            </select>
          </div>

          {/* Time Format */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Clock className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-lg font-medium text-gray-800">Time Format</h2>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="timeFormat" 
                  value="12h" 
                  checked={preferences.timeFormat === '12h'}
                  onChange={() => handleChange('timeFormat', '12h')}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">12-hour (AM/PM)</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  name="timeFormat" 
                  value="24h" 
                  checked={preferences.timeFormat === '24h'}
                  onChange={() => handleChange('timeFormat', '24h')}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                />
                <span className="text-gray-700">24-hour</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg flex items-center justify-center font-medium text-white ${
              isLoading ? 'bg-primary/70' : 'bg-primary hover:bg-primary/90'
            } transition-colors shadow-md`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Preferences
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesPage;
