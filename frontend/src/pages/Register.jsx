import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Calendar, AlertCircle, Loader } from 'lucide-react';
import { registerUser } from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.dateOfBirth) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }

      if (formData.phone.length !== 10 || isNaN(formData.phone)) {
        setError('Phone number must be 10 digits');
        setLoading(false);
        return;
      }

      await registerUser(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 text-sm mt-2">Join FinanceBank and start managing your finances</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start space-x-3">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">First Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="input-field pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Last Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="input-field pl-10"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength="10"
                    className="input-field pl-10"
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Date of Birth</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-field pl-10"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field pl-10"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-xs mt-6">
          © 2024 FinanceBank. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;