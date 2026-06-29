import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Loans = () => {
  const [loans] = useState([
    { id: 1, type: 'Personal Loan', amount: 300000, duration: '3 years', rate: 9.5, emi: 10200, status: 'active', disbursed: 300000, balance: 180000 },
    { id: 2, type: 'Home Loan', amount: 2500000, duration: '20 years', rate: 7.2, emi: 17800, status: 'active', disbursed: 2500000, balance: 1800000 },
    { id: 3, type: 'Auto Loan', amount: 500000, duration: '5 years', rate: 8.5, emi: 9800, status: 'active', disbursed: 500000, balance: 250000 },
  ]);

  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 md:ml-64 pt-6 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Loans</h1>
              <p className="text-gray-600 mt-2">Manage your active loans and track payments</p>
            </div>

            {/* Loans Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Loan Amount</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">₹32,00,000</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Outstanding Balance</p>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">₹22,30,000</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <AlertCircle className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Monthly EMI</p>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">₹37,800</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <Clock className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Loans */}
            <div className="card">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Active Loans</h2>
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{loan.type}</h3>
                        <p className="text-sm text-gray-600">Applied on: 2023-06-15</p>
                      </div>
                      <span className="inline-block mt-2 sm:mt-0 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {loan.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Loan Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Loan Progress</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {Math.round(((loan.disbursed - loan.balance) / loan.disbursed) * 100)}% Paid
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${((loan.disbursed - loan.balance) / loan.disbursed) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Loan Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-4 pb-4 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Loan Amount</p>
                        <p className="font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Duration</p>
                        <p className="font-semibold text-gray-900">{loan.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-semibold text-gray-900">{loan.rate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                        <p className="font-semibold text-gray-900">₹{loan.emi.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Disbursed</p>
                        <p className="font-semibold text-gray-900">₹{loan.disbursed.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Balance</p>
                        <p className="font-semibold text-gray-900">₹{loan.balance.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <button className="flex-1 btn-primary text-sm">Pay EMI</button>
                      <button
                        onClick={() => setShowDetails(showDetails === loan.id ? null : loan.id)}
                        className="flex-1 btn-secondary text-sm"
                      >
                        {showDetails === loan.id ? 'Hide' : 'View'} Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

import { useState } from 'react';
export default Loans;