import { useState } from 'react';
import { Search, Download, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [transactions] = useState([
    { id: 1, description: 'Salary Deposit', type: 'credit', amount: 50000, date: '2024-06-28', status: 'completed' },
    { id: 2, description: 'Grocery Store - Amazon', type: 'debit', amount: 2500, date: '2024-06-27', status: 'completed' },
    { id: 3, description: 'Electricity Bill', type: 'debit', amount: 1200, date: '2024-06-25', status: 'pending' },
    { id: 4, description: 'ATM Withdrawal', type: 'debit', amount: 10000, date: '2024-06-24', status: 'completed' },
    { id: 5, description: 'Freelance Payment', type: 'credit', amount: 15000, date: '2024-06-23', status: 'completed' },
    { id: 6, description: 'Restaurant - Zomato', type: 'debit', amount: 850, date: '2024-06-22', status: 'completed' },
  ]);

  const filteredTransactions = transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterType === 'all' || t.type === filterType;
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Transactions</h1>
              <p className="text-gray-600 mt-2">View and manage all your transactions</p>
            </div>

            {/* Filters */}
            <div className="card mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Search */}
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

                {/* Filter */}
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="input-field flex-1"
                  >
                    <option value="all">All Transactions</option>
                    <option value="credit">Income</option>
                    <option value="debit">Expenses</option>
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
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownLeft className="text-green-600" size={20} />
                              ) : (
                                <ArrowUpRight className="text-red-600" size={20} />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-sm text-gray-500">{transaction.type === 'credit' ? 'Income' : 'Expense'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{transaction.date}</td>
                        <td className="py-4 px-4 text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
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

export default Transactions;