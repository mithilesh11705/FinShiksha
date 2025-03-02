import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  DollarSign, 
  FileText, 
  Settings, 
  Bell, 
  Calendar, 
  CreditCard, 
  PieChart,
  Home,
  Menu,
  X,
  User,
  LogOut
} from 'lucide-react';

const FinancialDashboard = ({ userType = "admin" }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Different navigation options based on user type
  const navItems = {
    admin: [
      { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
      { id: "students", label: "Students", icon: <Users size={20} /> },
      { id: "finances", label: "Finances", icon: <DollarSign size={20} /> },
      { id: "reports", label: "Reports", icon: <FileText size={20} /> },
      { id: "payments", label: "Payments", icon: <CreditCard size={20} /> },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={20} /> },
      { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    ],
    student: [
      { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
      { id: "tuition", label: "Tuition", icon: <DollarSign size={20} /> },
      { id: "payments", label: "Payments", icon: <CreditCard size={20} /> },
      { id: "courses", label: "Courses", icon: <BookOpen size={20} /> },
      { id: "calendar", label: "Calendar", icon: <Calendar size={20} /> },
    ],
    parent: [
      { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
      { id: "children", label: "Children", icon: <Users size={20} /> },
      { id: "payments", label: "Payments", icon: <CreditCard size={20} /> },
      { id: "statements", label: "Statements", icon: <FileText size={20} /> },
      { id: "calendar", label: "Calendar", icon: <Calendar size={20} /> },
    ]
  };

  // User profile information
  const userProfiles = {
    admin: { name: "Admin User", role: "System Administrator" },
    student: { name: "Student User", role: "Engineering, Year 3" },
    parent: { name: "Parent User", role: "Parent of 2 Students" }
  };

  // Dashboard card components
  const DashboardCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className={`rounded-full p-3 mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  // Placeholder content for dashboard
  const renderDashboardContent = () => {
    if (userType === "admin") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Total Students" value="5,240" icon={<Users size={24} color="white" />} color="bg-blue-500" />
          <DashboardCard title="Monthly Revenue" value="$320,580" icon={<DollarSign size={24} color="white" />} color="bg-green-500" />
          <DashboardCard title="Outstanding Balance" value="$42,150" icon={<CreditCard size={24} color="white" />} color="bg-yellow-500" />
          
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Financial Overview</h2>
            <div className="h-64 flex items-center justify-center border border-gray-200 rounded bg-gray-50">
              <p className="text-gray-400">Financial chart placeholder</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Upcoming Payments</h2>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Spring Semester Tuition</p>
                <p className="text-sm text-gray-500">Due in 15 days</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Faculty Payroll</p>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Library Fees</p>
                <p className="text-sm text-gray-500">Due in 20 days</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">Student</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                    <th className="py-2 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">TRX-{1000 + i}</td>
                      <td className="py-2 px-4">Student {i + 1}</td>
                      <td className="py-2 px-4">{["Tuition", "Fees", "Books", "Housing", "Meal Plan"][i]}</td>
                      <td className="py-2 px-4">Mar {i + 1}, 2025</td>
                      <td className="py-2 px-4 text-right">${(1000 * (i + 1)).toLocaleString()}</td>
                      <td className="py-2 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${i % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {i % 2 === 0 ? "Completed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (userType === "student") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard title="Tuition Balance" value="$2,450" icon={<DollarSign size={24} color="white" />} color="bg-red-500" />
          <DashboardCard title="Scholarship" value="$5,000" icon={<BookOpen size={24} color="white" />} color="bg-green-500" />
          
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Payment Schedule</h2>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Spring Tuition</p>
                  <p className="text-sm text-gray-500">Due Mar 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$1,250</p>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Upcoming
                  </span>
                </div>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Lab Fees</p>
                  <p className="text-sm text-gray-500">Due Apr 5, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$350</p>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Upcoming
                  </span>
                </div>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Library Fees</p>
                  <p className="text-sm text-gray-500">Due Feb 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$75</p>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Financial Aid Overview</h2>
            <div className="h-64 flex items-center justify-center border border-gray-200 rounded bg-gray-50">
              <p className="text-gray-400">Financial aid chart placeholder</p>
            </div>
          </div>
        </div>
      );
    } else if (userType === "parent") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard title="Children Enrolled" value="2" icon={<Users size={24} color="white" />} color="bg-purple-500" />
          <DashboardCard title="Total Balance" value="$4,850" icon={<DollarSign size={24} color="white" />} color="bg-blue-500" />
          
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Children's Accounts</h2>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Emma Johnson</p>
                  <p className="text-sm text-gray-500">Grade 10, ID: ST10234</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$2,350 Balance</p>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Payment Due
                  </span>
                </div>
              </div>
              <div className="p-3 border rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">Michael Johnson</p>
                  <p className="text-sm text-gray-500">Grade 8, ID: ST10235</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">$2,500 Balance</p>
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Payment Due
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-4">Payment History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Child</th>
                    <th className="py-2 px-4 text-left">Description</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                    <th className="py-2 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-4">Feb {15 - i*5}, 2025</td>
                      <td className="py-2 px-4">{i % 2 === 0 ? "Emma Johnson" : "Michael Johnson"}</td>
                      <td className="py-2 px-4">{["Tuition Payment", "Book Fees", "Activity Fees"][i]}</td>
                      <td className="py-2 px-4 text-right">${(500 * (i + 1)).toLocaleString()}</td>
                      <td className="py-2 px-4 text-center">
                        <button className="text-blue-500 hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button 
        className="md:hidden fixed z-50 top-4 left-4 p-2 rounded-md bg-blue-600 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative z-40 w-64 h-full bg-gray-800 overflow-y-auto`}>
        {/* Logo and school name */}
        <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
          <DollarSign size={24} className="mr-2" />
          <h1 className="text-xl font-bold">FinEdu Admin</h1>
        </div>
        
        {/* User profile */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-600 p-2 rounded-full">
              <User size={24} className="text-white" />
            </div>
            <div className="text-white">
              <p className="font-medium">{userProfiles[userType].name}</p>
              <p className="text-sm text-gray-400">{userProfiles[userType].role}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems[userType].map(item => (
              <li key={item.id}>
                <button
                  className={`flex items-center w-full p-2 rounded-md text-left ${activePage === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
            
            <li className="pt-4 mt-4 border-t border-gray-700">
              <button className="flex items-center w-full p-2 rounded-md text-left text-gray-300 hover:bg-gray-700">
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow h-16 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold capitalize">
            {activePage}
          </h2>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">3</span>
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings size={20} />
            </button>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          {activePage === "dashboard" ? (
            renderDashboardContent()
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-xl mb-4 capitalize">{activePage} Page</h3>
              <p className="text-gray-500">This is a placeholder for the {activePage} page content.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FinancialDashboard;