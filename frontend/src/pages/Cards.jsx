import { Plus, Lock, Eye, EyeOff, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Cards = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [cards] = useState([
    { id: 1, name: 'Credit Card', type: 'credit', cardNumber: '4532 •••• •••• 1234', expiryDate: '12/26', cvv: '***', balance: 15000, limit: 100000, status: 'active' },
    { id: 2, name: 'Debit Card', type: 'debit', cardNumber: '5412 •••• •••• 5678', expiryDate: '08/27', cvv: '***', balance: 45250, limit: 'N/A', status: 'active' },
    { id: 3, name: 'Business Card', type: 'credit', cardNumber: '3782 •••• •••• 9012', expiryDate: '05/25', cvv: '***', balance: 8500, limit: 250000, status: 'inactive' },
  ]);

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
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">My Cards</h1>
                <p className="text-gray-600 mt-2">Manage your credit and debit cards</p>
              </div>
              <button className="mt-4 sm:mt-0 btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center">
                <Plus size={20} />
                <span>Order New Card</span>
              </button>
            </div>

            {/* Balance Toggle */}
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {showBalance ? <EyeOff size={20} /> : <Eye size={20} />}
                <span>{showBalance ? 'Hide' : 'Show'} Card Details</span>
              </button>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white relative overflow-hidden h-64 flex flex-col justify-between group"
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 opacity-10">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="100" />
                    </svg>
                  </div>

                  {/* Card Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <p className="text-xs opacity-75">CARD TYPE</p>
                        <p className="text-lg font-semibold uppercase">{card.type}</p>
                      </div>
                      <Lock size={24} />
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="relative z-10 mb-6">
                    <p className="text-sm opacity-75 mb-2">CARD NUMBER</p>
                    <p className="text-2xl tracking-wider font-mono">
                      {showBalance ? card.cardNumber.replace(/•/g, '*') : card.cardNumber}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-75">VALID THRU</p>
                      <p className="text-lg font-mono">{card.expiryDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        card.status === 'active'
                          ? 'bg-green-400 text-green-900'
                          : 'bg-gray-400 text-gray-900'
                      }`}>
                        {card.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Hover Menu */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/20 hover:bg-white/40 p-2 rounded-lg">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Statistics */}
            <div className="card mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Card Management</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div key={card.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">{card.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Balance:</span>
                        <span className="font-semibold">₹{card.balance.toLocaleString()}</span>
                      </div>
                      {card.limit !== 'N/A' && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credit Limit:</span>
                          <span className="font-semibold">₹{card.limit.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-semibold ${
                          card.status === 'active' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 text-sm px-3 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">Lock</button>
                      <button className="flex-1 text-sm px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                        <Trash2 size={16} className="inline mr-1" />
                        Delete
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

export default Cards;