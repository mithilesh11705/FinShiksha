import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Navigation menu items
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "accounts", icon: "💰", label: "Accounts" },
    { id: "transactions", icon: "🔄", label: "Transactions" },
    { id: "investments", icon: "📈", label: "Investments" },
    { id: "budget", icon: "📝", label: "Budget" },
    { id: "reports", icon: "📑", label: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="ds-dashboard-container">
      {/* Sidebar */}
      <div className="ds-sidebar">
        <div className="ds-logo">
          <h2>FinShiksha</h2>
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
              <p className="ds-user-name">John Doe</p>
              <p className="ds-user-role">Premium User</p>
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
          {activePage === "dashboard" && (
            <>
              {/* Top Row Cards */}
              <div className="ds-card-row">
                <div className="ds-card">
                  <h3>Total Balance</h3>
                  <div className="ds-card-value">$--,---</div>
                  <p className="ds-card-change">+--% from last month</p>
                </div>
                <div className="ds-card">
                  <h3>Income</h3>
                  <div className="ds-card-value">$--,---</div>
                  <p className="ds-card-change">+--% from last month</p>
                </div>
                <div className="ds-card">
                  <h3>Expenses</h3>
                  <div className="ds-card-value">$--,---</div>
                  <p className="ds-card-change">---% from last month</p>
                </div>
                <div className="ds-card">
                  <h3>Savings Rate</h3>
                  <div className="ds-card-value">--%</div>
                  <p className="ds-card-change">+--% from last month</p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="ds-chart-row">
                <div className="ds-chart-card">
                  <h3>Cash Flow</h3>
                  <div className="ds-chart-placeholder">Chart Area</div>
                </div>
                <div className="ds-chart-card">
                  <h3>Spending by Category</h3>
                  <div className="ds-chart-placeholder">Chart Area</div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="ds-table-section">
                <h3>Recent Transactions</h3>
                <div className="ds-transaction-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Placeholder rows */}
                      {[1, 2, 3, 4, 5].map((i) => (
                        <tr key={i}>
                          <td>--/--/----</td>
                          <td>Transaction Description</td>
                          <td>Category</td>
                          <td>$--.--</td>
                          <td>
                            <span className="ds-status">Completed</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activePage !== "dashboard" && (
            <div className="ds-placeholder-content">
              <h2>
                {navItems.find((item) => item.id === activePage)?.label} content
                will go here
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
