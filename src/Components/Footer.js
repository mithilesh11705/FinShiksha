import "./footer.css"; // Ensure this file is in the same directory

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              Fin<span>shiksha</span>
            </h3>
            <p>
              Transforming financial education and administration for a secure
              future.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                FB
              </a>
              <a href="#" className="social-icon">
                TW
              </a>
              <a href="#" className="social-icon">
                IN
              </a>
              <a href="#" className="social-icon">
                IG
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#">Financial Education</a>
              </li>
              <li>
                <a href="#">Investment Advisory</a>
              </li>
              <li>
                <a href="#">Tax Planning</a>
              </li>
              <li>
                <a href="#">Retirement Planning</a>
              </li>
              <li>
                <a href="#">Wealth Management</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for financial tips and updates.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your Email" />
              <button className="btn primary-btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Finshiksha. All rights reserved.</p>
        </div>
      </footer>
  );
};

export default Footer;
