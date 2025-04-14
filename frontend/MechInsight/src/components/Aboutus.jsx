import React from 'react';
import { Github, Linkedin, Globe, Code, Package, Layers } from 'lucide-react';

// Custom CSS styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    margin: 0,
    padding: 0,
    backgroundColor: '#f5f5f7',
    minHeight: '100vh'
  },
  // Header styles
  header: {
    background: 'linear-gradient(to right, #6b46c1, #4c1d95)',
    color: 'white',
    padding: '60px 20px',
    textAlign: 'center'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  headerTitle: {
    fontSize: '42px',
    fontWeight: 'bold',
    margin: '0 0 10px 0'
  },
  headerSubtitle: {
    fontSize: '22px',
    opacity: '0.9',
    margin: 0
  },
  // Section styles
  section: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto 40px auto'
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: '25px'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  eventInfo: {
    flex: '1'
  },
  eventHighlights: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px'
  },
  highlightsBox: {
    backgroundColor: '#e8e1ff',
    borderLeft: '4px solid #6b46c1',
    padding: '15px',
    borderRadius: '4px'
  },
  highlightsTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: '10px'
  },
  highlightsList: {
    listStylePosition: 'inside',
    paddingLeft: '5px',
    lineHeight: '1.6'
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '15px'
  },
  link: {
    color: '#6b46c1',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  // Project details styles
  projectTitle: {
    fontSize: '22px',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6b46c1',
    marginBottom: '15px'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  featureCard: {
    backgroundColor: '#f8f8f8',
    padding: '20px',
    borderRadius: '6px'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '15px',
    marginBottom: '25px'
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f8f8f8',
    padding: '12px',
    borderRadius: '6px'
  },
  achievementBox: {
    backgroundColor: '#ece6ff',
    border: '1px solid #ddd1ff',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '25px'
  },
  achievementTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#4c1d95',
    marginBottom: '12px'
  },
  // Team section styles
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px'
  },
  teamCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    transition: 'box-shadow 0.3s ease'
  },
  teamCardHover: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  teamImage: {
    height: '250px',
    backgroundColor: '#e5e5e5',
    position: 'relative'
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  teamInfo: {
    padding: '20px'
  },
  teamName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '4px'
  },
  teamRole: {
    color: '#666',
    marginBottom: '12px'
  },
  teamBio: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '15px'
  },
  socialLinks: {
    display: 'flex',
    gap: '12px'
  },
  // Footer styles
  footer: {
    backgroundColor: '#333',
    color: 'white',
    padding: '30px 20px'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  footerCopyright: {
    color: '#aaa',
    marginBottom: '20px'
  },
  footerLinks: {
    display: 'flex',
    gap: '15px'
  },
  footerLink: {
    color: '#ddd',
    transition: 'color 0.2s ease'
  },
  footerLinkHover: {
    color: 'white'
  }
};

// Media queries (to be applied with inline conditional logic)
const mediaQueries = {
  desktop: window.innerWidth >= 768
};

const Aboutus = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Project Showcase</h1>
          <p style={styles.headerSubtitle}>A proud participant of Tic Tech Toe 2025</p>
        </div>
      </header>

      {/* Event Information */}
      <section style={styles.section}>
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>About the Event</h2>
          <div style={{
            ...styles.flexContainer,
            flexDirection: mediaQueries.desktop ? 'row' : 'column'
          }}>
            <div style={styles.eventInfo}>
              <p style={styles.paragraph}>
                <strong>Tic Tech Toe 2025</strong> is a premier technology hackathon bringing together the brightest minds in tech to collaborate, innovate, and create solutions for tomorrow's challenges.
              </p>
              <p style={styles.paragraph}>
                Held in DAIICT,gandhinagar in april, 2025, this year's theme focused on sustainable technology and AI-driven innovations that address real-world problems.
              </p>
              <div style={{ marginTop: '20px' }}>
                <a 
                  href="https://tictechtoe25.vercel.app/" 
                  style={styles.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Globe size={20} />
                  <span>https://tictechtoe25.vercel.app/</span>
                </a>
              </div>
            </div>
            <div style={styles.eventHighlights}>
              <div style={styles.highlightsBox}>
                <h3 style={styles.highlightsTitle}>Event Highlights</h3>
                <ul style={styles.highlightsList}>
                  <li>Over 200 participating teams</li>
                  <li>50,000 in prizes</li>
                  <li>Industry mentors from top tech companies</li>
                  <li>Workshops and networking opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section style={styles.section}>
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Our Project</h2>
          <p style={styles.projectTitle}>
            <strong>Project Name:</strong> MechInsight
          </p>
          <p style={styles.paragraph}>
            MechInsight is an innovative data visualization and analytics platform that helps organizations monitor and optimize their environmental impact. Our solution integrates IoT sensors, real-time data processing, and intuitive dashboards to provide actionable insights on energy usage, waste management, and carbon footprint.
          </p>
          
          <h3 style={styles.subtitle}>Key Features</h3>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <h4 style={styles.featureTitle}>Real-time Monitoring</h4>
              <p>Dashboard with live updates from connected sensors and systems</p>
            </div>
            <div style={styles.featureCard}>
              <h4 style={styles.featureTitle}>Predictive Analytics</h4>
              <p>AI-powered forecasting of resource usage and environmental impact</p>
            </div>
            <div style={styles.featureCard}>
              <h4 style={styles.featureTitle}>Customizable Reports</h4>
              <p>Generate detailed sustainability reports for stakeholders</p>
            </div>
            <div style={styles.featureCard}>
              <h4 style={styles.featureTitle}>Optimization Suggestions</h4>
              <p>Smart recommendations to reduce waste and improve efficiency</p>
            </div>
          </div>
          
          <h3 style={styles.subtitle}>Technologies Used</h3>
          <div style={styles.techGrid}>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>React.js</span>
            </div>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>Node.js</span>
            </div>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>Postgres(NeonDB)</span>
            </div>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>TensorFlow</span>
            </div>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>Render Vercel</span>
            </div>
            <div style={styles.techItem}>
              <Layers size={20} color="#6b46c1" />
              <span>Random Forest , Isolation Forest, LSTM</span>
            </div>
          </div>
          
          <div style={styles.achievementBox}>
            <h3 style={styles.achievementTitle}>Achievement</h3>
            <p style={styles.paragraph}>Our project have achieved 90% accuracy.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.section}>
        <div style={styles.sectionCard}>
          <h2 style={styles.sectionTitle}>Our Team</h2>
          <div style={styles.teamGrid}>
            {/* Team Member 1 */}
            <div style={styles.teamCard}>
              <div style={styles.teamImage}>
                <img 
                  src="../../src/assets/rhythm.png" 
                  alt="Team Member" 
                  style={styles.img}
                />
              </div>
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>Rhythm Panchal</h3>
                <p style={styles.teamRole}>Lead Developer</p>
                <p style={styles.teamBio}>Full-stack developer with expertise in React and Node.js ecosystems with  machine learning.</p>
                <div style={styles.socialLinks}>
                  <a 
                    href="https://www.linkedin.com/in/rhythm-panchal/" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/alwaysinmy-rhythm" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div style={styles.teamCard}>
              <div style={styles.teamImage}>
                <img 
                  src="../../src/assets/kaushik.jpg" 
                  alt="Team Member " 
                  style={styles.img}
                />
              </div>
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>Kaushik Prajapati</h3>
                <p style={styles.teamRole}>ML Engineer</p>
                <p style={styles.teamBio}>Experienced in Data Science and Machine Learning</p>
                <div style={styles.socialLinks}>
                  <a 
                    href="https://www.linkedin.com/in/kaushik-prajapati-923b75269/" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/kaushikatgithub" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div style={styles.teamCard}>
              <div style={styles.teamImage}>
                <img 
                  src="../../src/assets/kathan.jpg" 
                  alt="Team Member " 
                  style={styles.img}
                />
              </div>
              <div style={styles.teamInfo}>
                <h3 style={styles.teamName}>Kathan Shah</h3>
                <p style={styles.teamRole}>ML engineeringr</p>
                <p style={styles.teamBio}>major in AI/ML minor in Robotics</p>
                <div style={styles.socialLinks}>
                  <a 
                    href="https://www.linkedin.com/in/kathan-shah-638538206/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a 
                    href="https://github.com/kathanshah28" 
                    style={styles.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={styles.footerTitle}>MehcInsight</h2>
            <p style={styles.footerCopyright}>© 2025 All Rights Reserved</p>
          </div>
          <div style={styles.footerLinks}>
            <a 
              href="https://github.com/alwaysinmy-rhythm/Predictive-Maintenance-for-Smart-Manufacturing" 
              style={styles.footerLink}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://tictechtoe25.vercel.app/" 
              style={styles.footerLink}
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Aboutus;