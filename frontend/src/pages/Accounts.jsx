import { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Accounts = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Savings Account', type: 'Savings', balance: 45250, accountNumber: 'ACC1234567890', interestRate: 4.5 },
    { id: 2, name: 'Current Account', type: 'Current', balance: 12500, accountNumber: 'ACC0987654321', interestRate: 0 },
    { id: 3, name: 'Salary Account', type: 'Salary', balance: 85000, accountNumber: 'ACC1122334455', interestRate: 3.0 },
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Accounts</h1>
                <p className="text-gray-600 mt-2">Manage all your bank accounts</p>
              </div>
              <button className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
                <Plus size={20} />
                <span>Open New Account</span>
              </button>
            </div>

            {/* Balance Toggle */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                <span>{showBalance ? 'Hide' : 'Show'} Balances</span>
              </button>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <div key={account.id} className="card hover:shadow-xl cursor-pointer">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{account.name}</h3>
                    <p className="text-sm text-gray-600">{account.type}</p>
                  </div>

                  <div className="mb-4 py-4 border-y border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Account Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {showBalance ? `₹${account.balance.toLocaleString()}` : '••••••'}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Account Number</p>
                    <p className="text-sm font-mono text-gray-700">{account.accountNumber}</p>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Interest Rate</p>
                      <p className="text-sm font-semibold text-blue-600">{account.interestRate}%</p>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary text-sm">View Details</button>
                    <button className="flex-1 btn-secondary text-sm">Manage</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Statistics */}
            <div className="card mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Account Statistics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Total Balance</p>
                  <p className="text-3xl font-bold text-blue-600">₹{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Active Accounts</p>
                  <p className="text-3xl font-bold text-green-600">{accounts.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Average Balance</p>
                  <p className="text-3xl font-bold text-purple-600">₹{Math.round(accounts.reduce((sum, acc) => sum + acc.balance, 0) / accounts.length).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Accounts;