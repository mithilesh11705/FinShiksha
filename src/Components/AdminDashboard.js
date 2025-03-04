import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "./Admin.css";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const [feeStructures, setFeeStructures] = useState([]);
  const [staffPayments, setStaffPayments] = useState([]);
  const [budgetData, setBudgetData] = useState(null);
  const [financialReports, setFinancialReports] = useState([]);

  // Navigation menu items
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "fee-structure", icon: "💰", label: "Fee Structures" },
    { id: "staff-payments", icon: "👥", label: "Staff Payments" },
    { id: "budget", icon: "📈", label: "Budget & Expenses" },
    { id: "reports", icon: "📑", label: "Financial Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  // Fetch initial data on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser);

    // Fetch initial data
    fetchFeeStructures();
    fetchStaffPayments();
    fetchBudgetData();
    fetchFinancialReports();
  }, []);

  // Mock data fetching functions
  const fetchFeeStructures = () => {
    setFeeStructures([
      {
        id: 1,
        program: "Computer Science",
        semesterFee: 15000,
        hostелFee: 5000,
        libraryFee: 2000,
        deadline: "2024-07-15"
      },
      {
        id: 2,
        program: "Business Administration",
        semesterFee: 18000,
        hostелFee: 6000,
        libraryFee: 2500,
        deadline: "2024-07-15"
      }
    ]);
  };

  const fetchStaffPayments = () => {
    setStaffPayments([
      {
        id: 1,
        name: "John Smith",
        position: "Professor",
        department: "Computer Science",
        salary: 75000,
        lastPaid: "2024-02-28"
      },
      {
        id: 2,
        name: "Emily Johnson",
        position: "Assistant Professor",
        department: "Mathematics",
        salary: 55000,
        lastPaid: "2024-02-28"
      }
    ]);
  };

  const fetchBudgetData = () => {
    setBudgetData({
      totalBudget: 2000000,
      allocatedBudget: {
        academic: 800000,
        infrastructure: 500000,
        staffSalaries: 450000,
        utilities: 150000,
        other: 100000
      },
      expenses: {
        academic: 750000,
        infrastructure: 480000,
        staffSalaries: 440000,
        utilities: 140000,
        other: 90000
      }
    });
  };

  const fetchFinancialReports = () => {
    setFinancialReports([
      {
        id: 1,
        title: "Q1 2024 Financial Overview",
        date: "2024-04-01",
        totalRevenue: 2500000,
        totalExpenses: 2200000,
        netProfit: 300000
      },
      {
        id: 2,
        title: "Annual Budget Projection",
        date: "2024-01-15",
        totalRevenue: 10000000,
        totalExpenses: 9500000,
        netProfit: 500000
      }
    ]);
  };

  // Add Fee Structure
  const handleAddFeeStructure = () => {
    const newFeeStructure = {
      id: feeStructures.length + 1,
      program: "New Program",
      semesterFee: 0,
      hostелFee: 0,
      libraryFee: 0,
      deadline: ""
    };
    setFeeStructures([...feeStructures, newFeeStructure]);
  };

  // Render different content based on active page
  const renderContent = () => {
    switch(activePage) {
      case "dashboard":
        return renderDashboardContent();
      case "fee-structure":
        return renderFeeStructureContent();
      case "staff-payments":
        return renderStaffPaymentsContent();
      case "budget":
        return renderBudgetContent();
      case "reports":
        return renderFinancialReportsContent();
      case "settings":
        return renderSettingsContent();
      default:
        return renderDashboardContent();
    }
  };

  // Dashboard main content
  const renderDashboardContent = () => (
    <>
      <div className="ds-card-row">
        <div className="ds-card">
          <h3>Total Revenue</h3>
          <div className="ds-card-value">$2,500,000</div>
        </div>
        <div className="ds-card">
          <h3>Total Expenses</h3>
          <div className="ds-card-value">$2,200,000</div>
        </div>
        <div className="ds-card">
          <h3>Net Profit</h3>
          <div className="ds-card-value">$300,000</div>
        </div>
        <div className="ds-card">
          <h3>Pending Fees</h3>
          <div className="ds-card-value">$450,000</div>
        </div>
      </div>

      <div className="ds-chart-row">
        <div className="ds-chart-card">
          <h3>Budget Allocation</h3>
          {budgetData && (
            <div className="ds-budget-breakdown">
              <p>Academic: ${budgetData.allocatedBudget.academic}</p>
              <p>Infrastructure: ${budgetData.allocatedBudget.infrastructure}</p>
              <p>Staff Salaries: ${budgetData.allocatedBudget.staffSalaries}</p>
            </div>
          )}
        </div>
        <div className="ds-chart-card">
          <h3>Recent Financial Highlights</h3>
          {financialReports && financialReports.length > 0 && (
            <div className="ds-financial-highlights">
              <p>Q1 Total Revenue: ${financialReports[0].totalRevenue}</p>
              <p>Q1 Total Expenses: ${financialReports[0].totalExpenses}</p>
              <p>Q1 Net Profit: ${financialReports[0].netProfit}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Fee Structure Content
  const renderFeeStructureContent = () => (
    <div className="ds-fee-structure-container">
      <div className="ds-section-header">
        <h2>Fee Structures</h2>
        <button 
          className="ds-add-button"
          onClick={handleAddFeeStructure}
        >
          Add New Fee Structure
        </button>
      </div>
      <table className="ds-fee-structure-table">
        <thead>
          <tr>
            <th>Program</th>
            <th>Semester Fee</th>
            <th>Hostel Fee</th>
            <th>Library Fee</th>
            <th>Payment Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feeStructures.map((structure) => (
            <tr key={structure.id}>
              <td>{structure.program}</td>
              <td>${structure.semesterFee}</td>
              <td>${structure.hostелFee}</td>
              <td>${structure.libraryFee}</td>
              <td>{structure.deadline}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Staff Payments Content
  const renderStaffPaymentsContent = () => (
    <div className="ds-staff-payments-container">
      <div className="ds-section-header">
        <h2>Staff Payments</h2>
        <button className="ds-add-button">
          Process Payroll
        </button>
      </div>
      <table className="ds-staff-payments-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Last Paid</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffPayments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.name}</td>
              <td>{payment.position}</td>
              <td>{payment.department}</td>
              <td>${payment.salary}</td>
              <td>{payment.lastPaid}</td>
              <td>
                <button>Pay</button>
                <button>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Budget Content
  const renderBudgetContent = () => (
    <div className="ds-budget-container">
      <h2>Budget & Expenses</h2>
      {budgetData && (
        <div className="ds-budget-details">
          <div className="ds-budget-summary">
            <div className="ds-budget-card">
              <h3>Total Budget</h3>
              <p>${budgetData.totalBudget}</p>
            </div>
            <div className="ds-budget-card">
              <h3>Total Expenses</h3>
              <p>
                ${Object.values(budgetData.expenses).reduce((a, b) => a + b, 0)}
              </p>
            </div>
          </div>
          <div className="ds-budget-breakdown">
            <h3>Budget Allocation vs Expenses</h3>
            {Object.keys(budgetData.allocatedBudget).map((category) => (
              <div key={category} className="ds-budget-category">
                <div className="ds-category-name">{category}</div>
                <div className="ds-category-values">
                  <span>Allocated: ${budgetData.allocatedBudget[category]}</span>
                  <span>Spent: ${budgetData.expenses[category]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Financial Reports Content
  const renderFinancialReportsContent = () => (
    <div className="ds-financial-reports-container">
      <div className="ds-section-header">
        <h2>Financial Reports</h2>
        <button className="ds-add-button">
          Generate New Report
        </button>
      </div>
      <table className="ds-financial-reports-table">
        <thead>
          <tr>
            <th>Report Title</th>
            <th>Date</th>
            <th>Total Revenue</th>
            <th>Total Expenses</th>
            <th>Net Profit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {financialReports.map((report) => (
            <tr key={report.id}>
              <td>{report.title}</td>
              <td>{report.date}</td>
              <td>${report.totalRevenue}</td>
              <td>${report.totalExpenses}</td>
              <td>${report.netProfit}</td>
              <td>
                <button>View</button>
                <button>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Settings Content
  const renderSettingsContent = () => (
    <div className="ds-settings-container">
      <h2>Admin Settings</h2>
      <div className="ds-settings-grid">
        <div className="ds-setting-section">
          <h3>Account Settings</h3>
          <div className="ds-setting-item">
            <label>Admin Email</label>
            <input type="email" value={userData?.email || ''} readOnly />
          </div>
          <button>Change Password</button>
        </div>
        <div className="ds-setting-section">
          <h3>System Preferences</h3>
          <div className="ds-toggle-setting">
            <label>Enable Two-Factor Authentication</label>
            <input type="checkbox" />
          </div>
          <div className="ds-toggle-setting">
            <label>Automated Financial Alerts</label>
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ds-dashboard-container">
      {/* Sidebar */}
      <div className="ds-sidebar">
        <div className="ds-logo">
          <h2>FinShiksha Admin</h2>
        </div>
        <div className="ds-nav-menu">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`ds-nav-item ${
                activePage === item.id ? "ds-active" : ""
              }`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="ds-nav-icon">{item.icon}</span>
              <span className="ds-nav-label">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="ds-sidebar-footer">
          <div className="ds-user-profile">
            <div className="ds-avatar">👤</div>
            <div className="ds-user-info">
              <p className="ds-user-name">{userData?.email || 'Admin'}</p>
              <p className="ds-user-role">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ds-main-content">
        {/* Header */}
        <header className="ds-dashboard-header">
          <div className="ds-header-title">
            <h1>
              {navItems.find((item) => item.id === activePage)?.label ||
                "Dashboard"}
            </h1>
          </div>
          <div className="ds-header-actions">
            <div className="ds-search-bar">
              <input type="text" placeholder="Search..." />
              <button>🔍</button>
            </div>
            <div className="ds-notifications">
              <button>🔔</button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="ds-dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;