import { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, TrendingUp, Loader, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getUserAccounts, createAccount, depositMoney, withdrawMoney } from '../services/accountService';

const Accounts = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    accountType: 'savings',
    ifscCode: 'FINC0001234',
    branchName: 'New Delhi'
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await getUserAccounts();
      setAccounts(data.accounts);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load accounts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createAccount(formData);
      await fetchAccounts();
      setShowCreateForm(false);
      setFormData({ accountType: 'savings', ifscCode: 'FINC0001234', branchName: 'New Delhi' });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading && accounts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-center">
            <Loader size={40} className="animate-spin text-blue-600" />
          </main>
        </div>
      </div>
    );
  }

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
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Plus size={20} />
                <span>Open New Account</span>
              </button>
            </div>

            {/* Create Account Form */}
            {showCreateForm && (
              <div className="card mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Create New Account</h2>
                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Account Type</label>
                      <select
                        name="accountType"
                        value={formData.accountType}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="savings">Savings</option>
                        <option value="current">Current</option>
                        <option value="salary">Salary</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Branch Name</label>
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex-1">Create Account</button>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start space-x-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

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
                <div key={account._id} className="card hover:shadow-xl cursor-pointer">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 capitalize">{account.accountType} Account</h3>
                    <p className="text-sm text-gray-600">{account.branchName}</p>
                  </div>

                  <div className="mb-4 py-4 border-y border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Account Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {showBalance ? `₹${account.balance.toLocaleString()}` : '••••••••'}
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
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      account.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 btn-primary text-sm">Details</button>
                    <button className="flex-1 btn-secondary text-sm">Manage</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Account Statistics */}
            {accounts.length > 0 && (
              <div className="card mt-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Account Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Total Balance</p>
                    <p className="text-3xl font-bold text-blue-600">₹{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Active Accounts</p>
                    <p className="text-3xl font-bold text-green-600">{accounts.filter(a => a.status === 'active').length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm mb-2">Average Balance</p>
                    <p className="text-3xl font-bold text-purple-600">₹{Math.round(accounts.reduce((sum, acc) => sum + acc.balance, 0) / accounts.length).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Accounts;