import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { updateProfile, changePassword } from '../services/authService';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      setUser(formData);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordChange(false);
      setMessage('Password changed successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-600 mt-2">Manage your account information</p>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-700 text-sm">{message}</p>
              </div>
            )}

            {/* Profile Picture & Basic Info */}
            <div className="card mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-blue-600 font-medium mt-1">Account ID: {user.accountNumber}</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 sm:mt-0 flex items-center space-x-2 btn-primary"
                  >
                    <Edit2 size={18} />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="form-label">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading}
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 text-gray-900 font-medium">
                      {user.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="form-label">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading}
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 text-gray-900 font-medium">
                      {user.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">Email Address</label>
                  <div className="bg-gray-100 rounded-lg p-3 text-gray-600 flex items-center space-x-2">
                    <Mail size={18} />
                    <span>{user.email}</span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      disabled={loading}
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 text-gray-900 font-medium flex items-center space-x-2">
                      <Phone size={18} />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="form-label">Date of Birth</label>
                  <div className="bg-gray-50 rounded-lg p-3 text-gray-900 font-medium flex items-center space-x-2">
                    <Calendar size={18} />
                    <span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="form-label">Account Type</label>
                  <div className="bg-gray-50 rounded-lg p-3 text-gray-900 font-medium">
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                  </div>
                </div>
              </div>

              {/* Address (if editing) */}
              {isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Address Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address?.street || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, street: e.target.value }
                      }))}
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.address?.city || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={formData.address?.state || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, state: e.target.value }
                      }))}
                      className="input-field"
                    />
                    <input
                      type="text"
                      placeholder="Zip Code"
                      value={formData.address?.zipCode || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        address: { ...prev.address, zipCode: e.target.value }
                      }))}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ ...user });
                    }}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Security Section */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Security</h3>

              {!showPasswordChange ? (
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="w-full btn-secondary text-left flex items-center justify-between"
                >
                  <span>Change Password</span>
                  <span>→</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordData.oldPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="input-field"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="input-field"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="input-field"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleChangePassword}
                      disabled={loading}
                      className="flex-1 btn-primary"
                    >
                      Update Password
                    </button>
                    <button
                      onClick={() => setShowPasswordChange(false)}
                      className="flex-1 btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;