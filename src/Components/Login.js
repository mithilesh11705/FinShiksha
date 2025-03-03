import "./Loginpage.css";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import { useState, useEffect } from "react";
import Header from "./Header";
// Assuming you're using react-router-dom for navigation
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");

  // State to store user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student", // Default user type
  });

  // State for form validation and API response
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [userData, setUserData] = useState([]);

  // Fetch users data when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from your backend/API
  const fetchUsers = async () => {
    try {
      // In a real application, you would fetch from your actual API
      // const response = await fetch('your-api-endpoint/users');
      // const data = await response.json();
      
      // For demo purposes, using mock data
      const mockUsers = [
        { id: "1", email: "student@example.com", password: "password123", userType: "student" },
        { id: "2", email: "admin@example.com", password: "admin123", userType: "admin" },
        { id: "3", email: "test@example.com", password: "test123", userType: "student" }
      ];
      
      setUserData(mockUsers);
      console.log("Users data fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to check if user exists and credentials match
  const verifyUser = () => {
    // Find user with matching email
    const user = userData.find(user => user.email === formData.email);
    
    if (!user) {
      return { success: false, message: "User not found. Please check your email or sign up." };
    }
    
    // Check if password matches
    if (user.password !== formData.password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    
    // If we get here, both email and password match
    return { 
      success: true, 
      message: "Login successful", 
      user: {
        id: user.id,
        email: user.email,
        userType: user.userType
      }
    };
  };

  // Function to redirect user based on role
  const redirectBasedOnRole = (userType) => {
    if (userType === "admin") {
      navigate("/admin/dashboard");
    } else if (userType === "student") {
      navigate("/dashboard");
    } else {
      // Default fallback
      navigate("/dashboard");
    }
  };

  // Function to navigate to user details page
  const navigateToDetailsPage = (userId) => {
    navigate(`/user/${userId}/details`);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

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
      if (action === "Login") {
        // Verify existing user
        const verificationResult = verifyUser();
        
        if (verificationResult.success) {
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(verificationResult.user));
          
          // Show success message
          setApiResponse({
            success: true,
            message: "Login successful! Redirecting..."
          });
          
          // Short timeout to allow user to see success message before redirect
          setTimeout(() => {
            // First redirect to role-specific dashboard
            redirectBasedOnRole(verificationResult.user.userType);
            
            // Then navigate to details page
            // You can adjust the flow based on your app requirements
            // navigateToDetailsPage(verificationResult.user.id);
          }, 1500);
        } else {
          setApiResponse({
            success: false,
            message: verificationResult.message
          });
        }
      } else {
        // Handle Sign Up flow
        // In a real app, you'd send this data to your API to create a new user
        // For this example, we'll simulate a successful signup
        
        // Check if email already exists
        const existingUser = userData.find(user => user.email === formData.email);
        if (existingUser) {
          setApiResponse({
            success: false,
            message: "Email already registered. Please use a different email or login."
          });
          setIsSubmitting(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: `${userData.length + 1}`,
          email: formData.email,
          password: formData.password,
          userType: formData.userType
        };
        
        // In a real app, you would send this to your API
        // await fetch('/api/signup', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(newUser)
        // });
        
        // Add to local state for demo purposes
        setUserData([...userData, newUser]);
        
        // Store user in localStorage
        const userForStorage = {
          id: newUser.id,
          email: newUser.email,
          userType: newUser.userType
        };
        localStorage.setItem("user", JSON.stringify(userForStorage));
        
        setApiResponse({
          success: true,
          message: "Account created successfully! Redirecting..."
        });
        
        // Redirect after short delay
        setTimeout(() => {
          redirectBasedOnRole(newUser.userType);
          
          // Then navigate to details page for the new user
          navigateToDetailsPage(newUser.id);
        }, 1500);
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: "An error occurred. Please try again.",
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
        email: "Please enter a valid email to reset password",
      });
      return;
    }

    // Check if user exists
    const user = userData.find(user => user.email === formData.email);
    if (!user) {
      setApiResponse({
        success: false,
        message: "Email not found in our records."
      });
      return;
    }

    // Simulate password reset functionality
    console.log("Password reset initiated for:", formData.email);
    setApiResponse({
      success: true,
      message: "Password reset instructions sent to your email",
    });
  };

  // Handle redirect to sign up page
  const handleRedirectToSignUp = () => {
    setAction("Sign Up");
    setApiResponse(null);
    setErrors({});
  };

  // Handle redirect to login page
  const handleRedirectToLogin = () => {
    setAction("Login");
    setApiResponse(null);
    setErrors({});
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      {/* Show API response messages */}
      {apiResponse && (
        <div
          className={`response-message ${
            apiResponse.success ? "success" : "error"
          }`}
        >
          {apiResponse.message}
        </div>
      )}

      <div className="Inputs">
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
          {errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>

        {/* Role selection dropdown only for Sign Up */}
        {action === "Sign Up" && (
          <div className="input">
            <label className="role-label">Select Role:</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              className="role-dropdown"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      {action === "Sign Up" ? (
        <div className="redirect-link">
          Already have an account?{" "}
          <span onClick={handleRedirectToLogin}>Login here</span>
        </div>
      ) : (
        <div className="forgot-pw">
          Lost Password? <span onClick={handleForgotPassword}>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        {action === "Login" ? (
          <div className="new-user-text">
            New user? <span onClick={handleRedirectToSignUp}>Sign Up</span>
          </div>
        ) : (
          <div></div>
        )}
        <div
          className={`submit ${isSubmitting ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Processing..." : action}
        </div>
      </div>
    </div>
  );
}

export default Login;