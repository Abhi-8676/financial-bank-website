import { useState, useEffect } from 'react';
import { Search, Download, Filter, ArrowUpRight, ArrowDownLeft, Loader, AlertCircle, Send, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getTransactions } from '../services/transactionService';
import { getUserAccounts } from '../services/accountService';
import { createTransaction } from '../services/transactionService';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({
    fromAccountId: '',
    toAccountId: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, [filterType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [txnData, accData] = await Promise.all([
        getTransactions({ status: filterType === 'all' ? undefined : filterType }),
        getUserAccounts()
      ]);
      setTransactions(txnData.transactions);
      setAccounts(accData.accounts);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createTransaction({
        fromAccountId: transferData.fromAccountId,
        toAccountId: transferData.toAccountId,
        amount: parseFloat(transferData.amount),
        description: transferData.description,
        transactionType: 'transfer'
      });
      await fetchData();
      setShowTransferForm(false);
      setTransferData({ fromAccountId: '', toAccountId: '', amount: '', description: '' });
      setError('');
    } catch (err) {
      setError(err.message || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(t =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 mt-2">View and manage all your transactions</p>
              </div>
              <button
                onClick={() => setShowTransferForm(!showTransferForm)}
                className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Send size={20} />
                <span>New Transfer</span>
              </button>
            </div>

            {/* Transfer Form */}
            {showTransferForm && (
              <div className="card mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Money Transfer</h2>
                <form onSubmit={handleTransfer} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">From Account</label>
                      <select
                        name="fromAccountId"
                        value={transferData.fromAccountId}
                        onChange={(e) => setTransferData({...transferData, fromAccountId: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="">Select account</option>
                        {accounts.map(acc => (
                          <option key={acc._id} value={acc._id}>
                            {acc.accountType} - ₹{acc.balance}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="form-label">To Account</label>
                      <select
                        name="toAccountId"
                        value={transferData.toAccountId}
                        onChange={(e) => setTransferData({...transferData, toAccountId: e.target.value})}
                        className="input-field"
                        required
                      >
                        <option value="">Select account</option>
                        {accounts.filter(acc => acc._id !== transferData.fromAccountId).map(acc => (
                          <option key={acc._id} value={acc._id}>
                            {acc.accountType} - ₹{acc.balance}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Amount</label>
                    <input
                      type="number"
                      value={transferData.amount}
                      onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
                      placeholder="Enter amount"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      value={transferData.description}
                      onChange={(e) => setTransferData({...transferData, description: e.target.value})}
                      placeholder="Enter description"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary flex-1">Transfer</button>
                    <button
                      type="button"
                      onClick={() => setShowTransferForm(false)}
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

            {/* Filters */}
            <div className="card mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="all">All Transactions</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Transactions ({filteredTransactions.length})</h2>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                  <Download size={18} />
                  <span>Export</span>
                </button>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader size={40} className="animate-spin text-blue-600" />
                </div>
              ) : filteredTransactions.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No transactions found</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                transaction.transactionType === 'transfer' || transaction.transactionType === 'deposit'
                                  ? 'bg-green-100'
                                  : 'bg-red-100'
                              }`}>
                                {transaction.transactionType === 'transfer' || transaction.transactionType === 'deposit' ? (
                                  <ArrowDownLeft className="text-green-600" size={20} />
                                ) : (
                                  <ArrowUpRight className="text-red-600" size={20} />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.reference}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600">{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                          <td className="py-4 px-4 text-right">
                            <p className={`font-semibold ${
                              transaction.transactionType === 'transfer' || transaction.transactionType === 'deposit'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}>
                              {transaction.transactionType === 'transfer' || transaction.transactionType === 'deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                            </p>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;