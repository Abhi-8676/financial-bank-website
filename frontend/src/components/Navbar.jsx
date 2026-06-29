import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { logoutUser } from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">FB</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg">FinanceBank</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
            <Link to="/accounts" className="hover:text-blue-200 transition-colors">Accounts</Link>
            <Link to="/transactions" className="hover:text-blue-200 transition-colors">Transactions</Link>
            <Link to="/profile" className="hover:text-blue-200 transition-colors">Profile</Link>
          </div>

          {/* User Info & Logout - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-blue-200">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-blue-700 rounded">Dashboard</Link>
            <Link to="/accounts" className="block px-4 py-2 hover:bg-blue-700 rounded">Accounts</Link>
            <Link to="/transactions" className="block px-4 py-2 hover:bg-blue-700 rounded">Transactions</Link>
            <Link to="/profile" className="block px-4 py-2 hover:bg-blue-700 rounded">Profile</Link>
            <hr className="my-2 border-blue-500" />
            <div className="px-4 py-2">
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-blue-200">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded flex items-center justify-center space-x-2 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
