import React, { useState, useEffect } from "react";
import "./landing.css";
import { Link } from "react-router-dom";

const FinshikshaLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countUp, setCountUp] = useState({ clients: 0, years: 0, returns: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // For the counter animation when scrolled into view
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById("stats-section");
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCountUp((prev) => ({
          clients: prev.clients >= 5000 ? 5000 : prev.clients + 50,
          years: prev.years >= 15 ? 15 : prev.years + 1,
          returns: prev.returns >= 25 ? 25 : prev.returns + 1,
        }));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Finshiksha transformed our financial approach with their innovative strategies and dedicated team.",
      author: "Rajiv Mehta, CEO of TechSolutions Inc.",
    },
    {
      text: "Their expertise in financial education helped me navigate complex investment decisions with confidence.",
      author: "Priya Sharma, Small Business Owner",
    },
    {
      text: "The personalized financial planning from Finshiksha has resulted in tangible growth for our organization.",
      author: "Amit Patel, Director of Operations, GrowthCap Ltd.",
    },
  ];

  const services = [
    {
      id: 1,
      title: "Financial Education",
      description:
        "Comprehensive courses and workshops to enhance your financial literacy.",
      icon: "📚",
    },
    {
      id: 2,
      title: "Investment Advisory",
      description:
        "Expert guidance on investment opportunities tailored to your risk profile.",
      icon: "📈",
    },
    {
      id: 3,
      title: "Tax Planning",
      description:
        "Strategic tax planning to optimize your financial efficiency.",
      icon: "📋",
    },
    {
      id: 4,
      title: "Retirement Planning",
      description:
        "Secure your future with our specialized retirement planning services.",
      icon: "🏖️",
    },
  ];

  const [btnName, setbtnName] = useState("Login");

  const handleClick = () => {
    btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
  };
  return (
    <div className="finshiksha-app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <h1>
            Fin<span>shiksha</span>
          </h1>
        </div>
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
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
            <li>
            <Link className="link" to="/Login">
              <btn className="log"  onClick={handleClick}>{btnName}</btn>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "change" : ""}`}></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="animate-up">Transform Your Financial Future</h1>
          <p className="animate-up delay-1">
            Expert financial administration and education to help you achieve
            your goals
          </p>
          <div className="hero-buttons animate-up delay-2">
          <Link  to="/Login">
            <button className="btn primary-btn">Get Started</button>
            </Link>
            <button className="btn secondary-btn">Learn More</button>
          </div>
        </div>
        <div className="hero-image animate-right">
          <div className="abstract-shape"></div>
          <div className="abstract-shape-2"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <h2>About Finshiksha</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Finshiksha is a premier financial administration institution
                dedicated to empowering individuals and businesses through
                comprehensive financial education and strategic planning.
              </p>
              <p>
                Our mission is to bridge the gap between complex financial
                concepts and practical applications, ensuring our clients make
                informed decisions that lead to sustainable growth.
              </p>
              <button className="btn primary-btn">Our Philosophy</button>
            </div>
            <div className="about-image">
              <div className="image-container">
                <div className="floating-element"></div>
                <div className="floating-element-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="stats-section">
        <div className="stat-item">
          <h3>{countUp.clients.toLocaleString()}+</h3>
          <p>Satisfied Clients</p>
        </div>
        <div className="stat-item">
          <h3>{countUp.years}+</h3>
          <p>Years of Excellence</p>
        </div>
        <div className="stat-item">
          <h3>{countUp.returns}%</h3>
          <p>Average Returns</p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact" className="service-link">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-container">
          <div
            className="testimonial-slider"
            style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-item">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{testimonial.text}</p>
                <p className="testimonial-author">{testimonial.author}</p>
              </div>
            ))}
          </div>
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === activeTestimonial ? "active" : ""
                }`}
                onClick={() => setActiveTestimonial(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Secure Your Financial Future?</h2>
          <p>Book a free consultation with our expert advisors today.</p>
          <button className="btn primary-btn">Schedule Now</button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn primary-btn">
                Send Message
              </button>
            </form>
          </div>
          <div className="contact-info">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                <h4>Location</h4>
                <p>123 Financial District, Mumbai 400001</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-text">
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-text">
                <h4>Email</h4>
                <p>info@finshiksha.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">🕒</div>
              <div className="info-text">
                <h4>Working Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FinshikshaLanding;
