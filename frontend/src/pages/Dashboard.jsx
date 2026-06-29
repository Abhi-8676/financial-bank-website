import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Wallet, Send, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        {/* Main Content */}
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
              <p className="text-gray-600 mt-2">Here's your financial overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Balance Card */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Balance</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">₹45,250.00</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Wallet className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              {/* Income Card */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Monthly Income</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">+₹15,000</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                </div>
              </div>

              {/* Expenses Card */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Monthly Expenses</p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">-₹8,500</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <TrendingDown className="text-red-600" size={24} />
                  </div>
                </div>
              </div>

              {/* Savings Card */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Savings</p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">₹32,750</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Wallet className="text-purple-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button className="flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors">
                  <Send size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Transfer</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors">
                  <Plus size={20} className="text-green-600" />
                  <span className="text-sm font-medium text-green-600">Deposit</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors">
                  <Wallet size={20} className="text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">Pay Bills</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-orange-50 hover:bg-orange-100 p-4 rounded-lg transition-colors">
                  <TrendingUp size={20} className="text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">Invest</span>
                </button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Salary Deposit</td>
                      <td className="py-3 px-4">Jun 28, 2024</td>
                      <td className="py-3 px-4 font-semibold text-green-600">+₹50,000</td>
                      <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span></td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">Grocery Store</td>
                      <td className="py-3 px-4">Jun 27, 2024</td>
                      <td className="py-3 px-4 font-semibold text-red-600">-₹2,500</td>
                      <td className="py-3 px-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">Completed</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Electricity Bill</td>
                      <td className="py-3 px-4">Jun 25, 2024</td>
                      <td className="py-3 px-4 font-semibold text-red-600">-₹1,200</td>
                      <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;