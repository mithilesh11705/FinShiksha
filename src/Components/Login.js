import "./Loginpage.css";

import email_icon from "../Components/images/email.png";
import password_icon from "../Components/images/password.png";
import person_icon from "../Components/images/person.png";
import { useState } from "react";
function Login() {
  const [action, setAction] = useState("Login");

  return (
    <div className="Container">
      <div className="Header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="Inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={person_icon} alt="" />
            <input type="text" placeholder="Username" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="password" />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-pw">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
