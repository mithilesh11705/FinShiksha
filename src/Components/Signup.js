import "./Loginpage.css";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  // State to store user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for form validation and API response
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

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
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        // Store user in localStorage
        const userForStorage = {
          id: data.userId || data.id,
          email: formData.email,
          userType: formData.userType,
        };
        localStorage.setItem("user", JSON.stringify(userForStorage));

        setApiResponse({
          success: true,
          message: "Account created successfully! Redirecting...",
        });

        // Redirect after short delay
        setTimeout(() => {
          redirectBasedOnRole(formData.userType);
        }, 1500);
      } else {
        setApiResponse({
          success: false,
          message: data.message || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setApiResponse({
        success: false,
        message: error.message || "An error occurred. Please try again.",
      });
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
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

  // Handle redirect to login page
  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="text">Sign Up</div>
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
      </div>

      <div className="redirect-link">
        Already have an account?{" "}
        <span onClick={handleRedirectToLogin}>Login here</span>
      </div>

      <div className="submit-container">
        <div></div>
        <div
          className={`submit ${isSubmitting ? "disabled" : ""}`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Processing..." : "Sign Up"}
        </div>
      </div>
    </div>
  );
}

export default SignUp;