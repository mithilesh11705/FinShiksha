import "./navbar.css";
import { useState } from "react";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <a href="https://flowbite.com/" className="logo">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="logo-img"
            alt="Flowbite Logo"
          />
          <span className="logo-text">FinShiksha</span>
        </a>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className={`nav-menu ${isOpen ? "show" : ""}`}>
          <ul className="nav-list">
            <li>
              <a href="#" className="nav-link active">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
