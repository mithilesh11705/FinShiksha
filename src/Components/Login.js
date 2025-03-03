import "./Loginpage.css";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import person_icon from "../images/person.png";
import { useState } from "react";
import Header from "./Header";

function Login() {
  const [action, setAction] = useState("Login");
  
  // State to store user input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "student" // Default user type
  });
  
  // State for form validation and API response
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  // User type options
  const userTypes = [
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
    { value: "admin", label: "Administrator" }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (action === "Sign Up" && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.userType) {
      newErrors.userType = "Please select a user type";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      // Replace with actual API endpoint in production
      const endpoint = action === "Login" ? "/api/login" : "/api/signup";
      
      // In a real app, you would use fetch or axios here
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();
      
      // For demo purposes, simulate API response
      const simulatedResponse = {
        success: true,
        message: action === "Login" 
          ? `${formData.userType} login successful` 
          : `${formData.userType} account created successfully`,
        user: { 
          id: "123", 
          email: formData.email,
          userType: formData.userType 
        }
      };
      
      // Store user data in localStorage or sessionStorage
      if (simulatedResponse.success) {
        localStorage.setItem("user", JSON.stringify(simulatedResponse.user));
        
        // You could also use context API or Redux for global state management
        console.log("User authenticated:", simulatedResponse.user);
        
        // Redirect to appropriate dashboard based on user type
        // const dashboardPath = `/dashboard/${formData.userType}`;
        // window.location.href = dashboardPath;
      }
      
      setApiResponse(simulatedResponse);
    } catch (error) {
      setApiResponse({
        success: false,
        message: "An error occurred. Please try again."
      });
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle "Lost Password" functionality
  const handleForgotPassword = () => {
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email to reset password"
      });
      return;
    }
    
    // Simulate password reset functionality
    console.log("Password reset initiated for:", formData.email);
    setApiResponse({
      success: true,
      message: "Password reset instructions sent to your email"
    });
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      
      {/* Show API response messages */}
      {apiResponse && (
        <div className={`response-message ${apiResponse.success ? "success" : "error"}`}>
          {apiResponse.message}
        </div>
      )}
      
      <div className="Inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={person_icon} alt="" />
            <input 
              type="text" 
              placeholder="Username" 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <div className="error-text">{errors.username}</div>}
          </div>
        )}
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input 
            type="email" 
            placeholder="Email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        
        <div className="input">
          <img src={password_icon} alt="" />
          <input 
            type="password" 
            placeholder="Password" 
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        
        {/* User Type Dropdown */}
        <div className="input">
          <select
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            className="select-input"
          >
            <option value="" disabled>Select User Type</option>
            {userTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.userType && <div className="error-text">{errors.userType}</div>}
        </div>
      </div>
      
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-pw">
          Lost Password? <span onClick={handleForgotPassword}>Click Here!</span>
        </div>
      )}
      
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
            setApiResponse(null);
          }}
        >
          Sign Up
        </div>
        <div
          className={`submit ${action === "Sign Up" ? "gray" : ""} ${isSubmitting ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Processing..." : action}
        </div>
      </div>
    </div>
  );
}

export default Login;