import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  User, 
  CreditCard, 
  BarChart3, 
  PieChart, 
  DollarSign, 
  Clock, 
  Bell, 
  Settings, 
  LogOut, 
  Menu 
} from 'lucide-react';

const FinanceDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    dashboard: true,
    accounts: false,
    investments: false,
    settings: false
  });

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    accountBalance: 24890.75,
    savings: 12450.30,
    investments: 43250.80,
    recentTransactions: [
      { id: 1, merchant: "Amazon", amount: -79.99, date: "Feb 28, 2025", category: "Shopping" },
      { id: 2, merchant: "Salary Deposit", amount: 3500.00, date: "Feb 27, 2025", category: "Income" },
      { id: 3, merchant: "Starbucks", amount: -5.45, date: "Feb 26, 2025", category: "Food" },
      { id: 4, merchant: "Electric Bill", amount: -124.37, date: "Feb 25, 2025", category: "Utilities" }
    ],
    upcomingBills: [
      { id: 1, name: "Rent", amount: 1800.00, dueDate: "Mar 5, 2025" },
      { id: 2, name: "Car Insurance", amount: 145.50, dueDate: "Mar 15, 2025" },
      { id: 3, name: "Internet", amount: 79.99, dueDate: "Mar 10, 2025" }
    ],
    investmentPerformance: [
      { name: "Stocks", value: 25500.50, change: +2.4 },
      { name: "Bonds", value: 10750.30, change: +0.7 },
      { name: "Crypto", value: 7000.00, change: -1.2 }
    ]
  };

  const toggleDropdown = (section) => {
    setDropdownOpen({
      ...dropdownOpen,
      [section]: !dropdownOpen[section]
    });
  };

  // Card component for reusability
  const Card = ({ title, children, className }) => (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu toggle */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:static w-64 h-full bg-white shadow-lg z-40`}>
        {/* User profile section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <User size={24} />
            </div>
            <div>
              <h2 className="font-bold">{userData.name}</h2>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {/* Dashboard Section */}
            <li>
              <button 
                onClick={() => toggleDropdown('dashboard')} 
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <BarChart3 size={18} className="mr-2" />
                  <span>Dashboard</span>
                </div>
                {dropdownOpen.dashboard ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {dropdownOpen.dashboard && (
                <ul className="pl-6 mt-2 space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveSection('overview')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'overview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveSection('analytics')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'analytics' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Analytics
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Accounts Section */}
            <li>
              <button 
                onClick={() => toggleDropdown('accounts')} 
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <CreditCard size={18} className="mr-2" />
                  <span>Accounts</span>
                </div>
                {dropdownOpen.accounts ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {dropdownOpen.accounts && (
                <ul className="pl-6 mt-2 space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveSection('transactions')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'transactions' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Transactions
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveSection('bills')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'bills' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Bills
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Investments Section */}
            <li>
              <button 
                onClick={() => toggleDropdown('investments')} 
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <PieChart size={18} className="mr-2" />
                  <span>Investments</span>
                </div>
                {dropdownOpen.investments ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {dropdownOpen.investments && (
                <ul className="pl-6 mt-2 space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveSection('portfolio')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'portfolio' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Portfolio
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveSection('performance')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'performance' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Performance
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings Section */}
            <li>
              <button 
                onClick={() => toggleDropdown('settings')} 
                className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <Settings size={18} className="mr-2" />
                  <span>Settings</span>
                </div>
                {dropdownOpen.settings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {dropdownOpen.settings && (
                <ul className="pl-6 mt-2 space-y-1">
                  <li>
                    <button 
                      onClick={() => setActiveSection('account')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'account' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Account
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveSection('security')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'security' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Security
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveSection('notifications')}
                      className={`w-full text-left p-2 rounded ${activeSection === 'notifications' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      Notifications
                    </button>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <button className="flex items-center w-full p-2 rounded hover:bg-gray-100 text-red-500">
                <LogOut size={18} className="mr-2" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        {/* Top bar with search and notifications */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
          </div>
        </div>

        {/* Dashboard content - conditionally render based on active section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Summary */}
            <Card title="Account Summary" className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign size={20} className="text-blue-600 mr-2" />
                    <span className="text-sm text-gray-500">Total Balance</span>
                  </div>
                  <p className="text-2xl font-bold">${userData.accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign size={20} className="text-green-600 mr-2" />
                    <span className="text-sm text-gray-500">Savings</span>
                  </div>
                  <p className="text-2xl font-bold">${userData.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <PieChart size={20} className="text-purple-600 mr-2" />
                    <span className="text-sm text-gray-500">Investments</span>
                  </div>
                  <p className="text-2xl font-bold">${userData.investments.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </Card>

            {/* Upcoming Bills */}
            <Card title="Upcoming Bills">
              <ul className="space-y-3">
                {userData.upcomingBills.map(bill => (
                  <li key={bill.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-gray-500">Due {bill.dueDate}</p>
                    </div>
                    <span className="font-semibold">${bill.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Recent Transactions */}
            <Card title="Recent Transactions" className="md:col-span-2">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Merchant</th>
                      <th className="text-left py-2">Category</th>
                      <th className="text-left py-2">Date</th>
                      <th className="text-right py-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.recentTransactions.map(transaction => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50">
                        <td className="py-3">{transaction.merchant}</td>
                        <td className="py-3">{transaction.category}</td>
                        <td className="py-3">{transaction.date}</td>
                        <td className={`py-3 text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Investment Performance */}
            <Card title="Investment Performance">
              <ul className="space-y-3">
                {userData.investmentPerformance.map(investment => (
                  <li key={investment.name} className="flex items-center justify-between">
                    <span className="font-medium">{investment.name}</span>
                    <div className="text-right">
                      <p className="font-semibold">${investment.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className={`text-sm ${investment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {investment.change >= 0 ? '↑' : '↓'} {Math.abs(investment.change)}%
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}

        {/* Placeholder content for other sections */}
        {activeSection !== 'overview' && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section</h2>
            <p className="text-gray-500">This is the {activeSection} section of your financial dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceDashboard;