import "./footer.css"; // Ensure this file is in the same directory

const Footer = () => {
  return (
    <footer className="footer">
      <div className="f-container">
        <span className="footer-text">
          © 2023{" "}
          <a href="https://flowbite.com/" className="footer-link">
            FinShiksha™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="footer-menu">
          <li>
            <a href="#" className="footer-link">
              About
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="footer-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
