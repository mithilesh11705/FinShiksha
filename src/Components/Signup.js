import "./Loginpage.css";
import email_icon from "../images/email.png";
import password_icon from "../images/password.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "stud", // Default user type
  });

  const [errors, setErrors] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;

    // Save user details to localStorage
    localStorage.setItem("signupData", JSON.stringify(formData));

    // Redirect to additional details page
    navigate("/details");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {apiResponse && (
        <p className={`response ${apiResponse.success ? "success" : "error"}`}>
          {apiResponse.message}
        </p>
      )}

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      {/* <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div> */}

      <div className="form-group">
        <label>User Type</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
        >
          <option value="student">stud</option>

          <option value="staff">staff</option>
        </select>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
