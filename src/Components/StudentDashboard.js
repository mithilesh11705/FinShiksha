import React, { useState, useEffect } from "react";
import "./dashboard.css";
import "./Student.css";
const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [userData, setUserData] = useState(null);
  const [studentDetails, setStudentDetails] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [feesDetails, setFeesDetails] = useState(null);

  // Navigation menu items
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "fees", icon: "💰", label: "Fees Payment" },
    { id: "receipts", icon: "📄", label: "View Receipts" },
    { id: "notifications", icon: "🔔", label: "Notifications" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  // Fetch user and student data on component mount
  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUserData(storedUser);

    // Simulate fetching student details
    fetchStudentDetails();
    fetchNotifications();
    fetchReceipts();
    fetchFeesDetails();
  }, []);

  // Simulate API calls (replace with actual API calls in real implementation)
  const fetchStudentDetails = () => {
    // Mock student details
    setStudentDetails({
      name: "John Doe",
      studentId: "ST12345",
      course: "Computer Science",
      semester: "6th",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      academicYear: "2023-2024"
    });
  };

  const fetchNotifications = () => {
    // Mock notifications
    setNotifications([
      { id: 1, title: "Fee Reminder", message: "Semester fees due by 15th", date: "2024-03-01" },
      { id: 2, title: "Academic Update", message: "Midterm exam schedule released", date: "2024-02-25" },
      { id: 3, title: "New Course", message: "Advanced Programming workshop", date: "2024-02-20" }
    ]);
  };

  const fetchReceipts = () => {
    // Mock receipts
    setReceipts([
      { 
        id: 1, 
        receiptNumber: "RCP2024001", 
        date: "2024-01-15", 
        amount: 5000, 
        type: "Semester Fees",
        status: "Paid"
      },
      { 
        id: 2, 
        receiptNumber: "RCP2024002", 
        date: "2024-02-15", 
        amount: 2500, 
        type: "Hostel Fees",
        status: "Paid"
      }
    ]);
  };

  const fetchFeesDetails = () => {
    // Mock fees details
    setFeesDetails({
      totalFees: 25000,
      paidFees: 7500,
      remainingFees: 17500,
      semesterFees: 15000,
      hostелFees: 5000,
      libraryFees: 2000,
      otherCharges: 3000
    });
  };

  // Handle fee payment (simulated)
  const handleFeePayment = () => {
    alert("Redirecting to payment gateway...");
    // In a real app, this would integrate with a payment gateway
  };

  // Render different content based on active page
  const renderContent = () => {
    switch(activePage) {
      case "dashboard":
        return renderDashboardContent();
      case "fees":
        return renderFeesContent();
      case "receipts":
        return renderReceiptsContent();
      case "notifications":
        return renderNotificationsContent();
      case "settings":
        return renderSettingsContent();
      default:
        return renderDashboardContent();
    }
  };

  // Dashboard main content
  const renderDashboardContent = () => (
    <>
      {studentDetails && (
        <div className="ds-card-row">
          <div className="ds-card">
            <h3>Student ID</h3>
            <div className="ds-card-value">{studentDetails.studentId}</div>
          </div>
          <div className="ds-card">
            <h3>Course</h3>
            <div className="ds-card-value">{studentDetails.course}</div>
          </div>
          <div className="ds-card">
            <h3>Semester</h3>
            <div className="ds-card-value">{studentDetails.semester}</div>
          </div>
          <div className="ds-card">
            <h3>Academic Year</h3>
            <div className="ds-card-value">{studentDetails.academicYear}</div>
          </div>
        </div>
      )}

      {feesDetails && (
        <div className="ds-chart-row">
          <div className="ds-chart-card">
            <h3>Fees Overview</h3>
            <div className="ds-fees-breakdown">
              <p>Total Fees: ${feesDetails.totalFees}</p>
              <p>Paid Fees: ${feesDetails.paidFees}</p>
              <p>Remaining Fees: ${feesDetails.remainingFees}</p>
            </div>
          </div>
          <div className="ds-chart-card">
            <h3>Fees Breakdown</h3>
            <div className="ds-fees-details">
              <p>Semester Fees: ${feesDetails.semesterFees}</p>
              <p>Hostel Fees: ${feesDetails.hostелFees}</p>
              <p>Library Fees: ${feesDetails.libraryFees}</p>
              <p>Other Charges: ${feesDetails.otherCharges}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Fees Payment Content
  const renderFeesContent = () => (
    <div className="ds-fees-container">
      <h2>Fees Payment</h2>
      {feesDetails && (
        <div className="ds-fees-summary">
          <div className="ds-fees-card">
            <h3>Total Fees</h3>
            <p>${feesDetails.totalFees}</p>
          </div>
          <div className="ds-fees-card">
            <h3>Remaining Fees</h3>
            <p>${feesDetails.remainingFees}</p>
          </div>
          <button 
            className="ds-payment-button"
            onClick={handleFeePayment}
          >
            Pay Fees
          </button>
        </div>
      )}
    </div>
  );

  // Receipts Content
  const renderReceiptsContent = () => (
    <div className="ds-receipts-container">
      <h2>Payment Receipts</h2>
      <table className="ds-receipts-table">
        <thead>
          <tr>
            <th>Receipt No</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map(receipt => (
            <tr key={receipt.id}>
              <td>{receipt.receiptNumber}</td>
              <td>{receipt.date}</td>
              <td>${receipt.amount}</td>
              <td>{receipt.type}</td>
              <td>{receipt.status}</td>
              <td>
                <button onClick={() => alert(`Downloading receipt ${receipt.receiptNumber}`)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Notifications Content
  const renderNotificationsContent = () => (
    <div className="ds-notifications-container">
      <h2>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className="ds-notification-item">
          <div className="ds-notification-header">
            <h3>{notification.title}</h3>
            <span className="ds-notification-date">{notification.date}</span>
          </div>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );

  // Settings Content
  const renderSettingsContent = () => (
    <div className="ds-settings-container">
      <h2>Student Settings</h2>
      {studentDetails && (
        <div className="ds-profile-settings">
          <div className="ds-setting-section">
            <h3>Personal Information</h3>
            <p>Name: {studentDetails.name}</p>
            <p>Email: {studentDetails.email}</p>
            <p>Phone: {studentDetails.phone}</p>
            <button>Edit Profile</button>
          </div>
          <div className="ds-setting-section">
            <h3>Account Preferences</h3>
            <div className="ds-toggle-setting">
              <label>Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="ds-toggle-setting">
              <label>SMS Notifications</label>
              <input type="checkbox" />
            </div>
            <button>Change Password</button>
          </div>
        </div>
      )}
    </div>
  );

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
              <p className="ds-user-name">{studentDetails?.name || "Student"}</p>
              <p className="ds-user-role">Student</p>
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

export default StudentDashboard;