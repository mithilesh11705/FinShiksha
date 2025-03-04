import "./Loginpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRedirectToSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Step 1: Send login request
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Invalid email or password");
        setIsSubmitting(false);
        return;
      }
      // Step 2: Get user role after successful login
      const userInfoResponse = await fetch("http://localhost:5000/user-info", {
        method: "GET",
        credentials: "include",
      });
      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info");
      }
      const userInfo = await userInfoResponse.json();
      localStorage.setItem("userRole", userInfo.role); // Store role in localStorage
      // Step 3: Redirect based on role
      if (userInfo.role === "admin") {
        navigate("/admind");
      } else if (userInfo.role === "staff") {
        navigate("/staffd");
      } else if (userInfo.role === "stud") {
        navigate("/studentd");
      } else if (userInfo.role === "hod") {
        navigate("/hod-dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="Container">
      <div className="Header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      {error && <div className="error-text">{error}</div>}
      <div className="Inputs">
        <div className="input">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="forgot-pw">
        Lost Password? <span>Click Here!</span>
      </div>
      <div className="submit-container">
        <div className="new-user-text">
          New user? <span onClick={handleRedirectToSignUp}>Sign Up</span>
        </div>
        <div
          className={`submit ${isSubmitting ? "disabled" : ""}`}
          onClick={!isSubmitting ? handleSubmit : undefined}
        >
          {isSubmitting ? "Processing..." : "Login"}
        </div>
      </div>
    </div>
  );
}

export default Login;