import { Link } from 'react-router-dom';
import { LayoutDashboard, Wallet, TrendingUp, CreditCard, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:flex fixed left-0 top-16 h-screen w-64 bg-white border-r border-gray-200 flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          to="/accounts"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <Wallet size={20} />
          <span className="font-medium">Accounts</span>
        </Link>

        <Link
          to="/transactions"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <TrendingUp size={20} />
          <span className="font-medium">Transactions</span>
        </Link>

        <Link
          to="/cards"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <CreditCard size={20} />
          <span className="font-medium">Cards</span>
        </Link>

        <Link
          to="/loans"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <TrendingUp size={20} />
          <span className="font-medium">Loans</span>
        </Link>
      </nav>

      <div className="px-4 py-6 border-t border-gray-200">
        <Link
          to="/profile"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors mb-2"
        >
          <User size={20} />
          <span className="font-medium">Profile</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;