import React, { useState } from 'react';
import './CSS/Landingpage.css';
import LoginModal from './LoginModal';

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <circle cx="12" cy="12" r="8"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            <span className="logo-text">mechInsight</span>
          </div>
          <nav className="nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="/aboutus" className="nav-link">About Us</a>
          </nav>
          <div className="auth-buttons">
            <button className="btn btn-primary" onClick={() => setShowLoginModal(true)}>Login</button>
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
          </div>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <h1 className="hero-title">Track the pulse of your machines</h1>
                <p className="hero-text">
                  mechInsight provides real-time monitoring and predictive maintenance for your industrial equipment.
                  Detect anomalies before they become failures and optimize your maintenance schedule.
                </p>
                <div className="hero-buttons">
                  <button className="btn btn-primary">Get Started</button>
                  <button className="btn btn-outline">Learn More</button>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <div className="badge">Features</div>
              <h2 className="section-title">Everything you need to monitor your machines</h2>
              <p className="section-text">
                Our platform provides comprehensive monitoring and analytics to keep your equipment running smoothly.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3 className="feature-title">Real-time Monitoring</h3>
                <p className="feature-text">
                  Track machine performance metrics in real-time with customizable dashboards.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="feature-title">Predictive Maintenance</h3>
                <p className="feature-text">
                  AI-powered algorithms predict potential failures before they happen.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-icon">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <h3 className="feature-title">Anomaly Detection</h3>
                <p className="feature-text">
                  Automatically identify and alert on unusual machine behavior patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <div className="section-header">
              <div className="badge">How It Works</div>
              <h2 className="section-title">Simple setup, powerful insights</h2>
              <p className="section-text">
                Get started in minutes and start monitoring your machines right away.
              </p>
            </div>
            <div className="steps-grid">
              <div className="step">
                <h3 className="step-title">1. Connect your machines</h3>
                <p className="step-text">
                  Use our simple integration tools to connect your equipment to our platform.
                </p>
              </div>
              <div className="step">
                <h3 className="step-title">2. Monitor performance</h3>
                <p className="step-text">
                  View real-time data and analytics on your customizable dashboard.
                </p>
              </div>
              <div className="step">
                <h3 className="step-title">3. Receive alerts</h3>
                <p className="step-text">
                  Get notified when anomalies are detected or maintenance is required.
                </p>
              </div>
              <div className="step">
                <h3 className="step-title">4. Optimize maintenance</h3>
                <p className="step-text">
                  Use predictive insights to schedule maintenance only when needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing">
          <div className="container">
            <div className="section-header">
              <div className="badge">Pricing</div>
              <h2 className="section-title">Simple, transparent pricing</h2>
              <p className="section-text">
                Choose the plan that's right for your business.
              </p>
            </div>
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Starter</h3>
                  <p className="pricing-subtitle">For small businesses with basic needs</p>
                </div>
                <div className="pricing-price">
                  $99<span className="pricing-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Up to 10 machines
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Basic monitoring
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Email alerts
                  </li>
                </ul>
                <button className="btn btn-primary btn-full">Get Started</button>
              </div>
              <div className="pricing-card pricing-card-featured">
                <div className="pricing-header">
                  <h3 className="pricing-title">Professional</h3>
                  <p className="pricing-subtitle">For growing businesses with advanced needs</p>
                </div>
                <div className="pricing-price">
                  $299<span className="pricing-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Up to 50 machines
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Advanced monitoring
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Email and SMS alerts
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Predictive maintenance
                  </li>
                </ul>
                <button className="btn btn-primary btn-full">Get Started</button>
              </div>
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="pricing-title">Enterprise</h3>
                  <p className="pricing-subtitle">For large organizations with complex needs</p>
                </div>
                <div className="pricing-price">
                  Custom<span className="pricing-period">/month</span>
                </div>
                <ul className="pricing-features">
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Unlimited machines
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Custom monitoring solutions
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    24/7 support
                  </li>
                  <li className="pricing-feature">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Dedicated account manager
                  </li>
                </ul>
                <button className="btn btn-primary btn-full">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <circle cx="12" cy="12" r="8"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            <span className="logo-text">mechInsight</span>
          </div>
          <p className="copyright">© 2025 mechInsight. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
