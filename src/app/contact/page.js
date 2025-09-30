export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="museum-layout">
      {/* Main Title */}
      <div className="museum-hero">
        <h1 className="museum-main-title">GET IN TOUCH</h1>
        <p className="museum-tagline">
          LET'S BUILD SOMETHING TOGETHER
        </p>
      </div>

      {/* Separator */}
      <div className="museum-separator"></div>

      {/* Contact Content */}
      <div className="contact-layout">
        <div className="contact-section">
          <div className="contact-method">
            <h2 className="contact-label">EMAIL</h2>
            <a
              href="mailto:hello@brennankapollock.com"
              className="contact-value link"
            >
              hello@brennankapollock.com
            </a>
            <p className="contact-description">
              Best for project inquiries, collaborations, and detailed discussions.
              Response within 24 hours.
            </p>
          </div>

          <div className="contact-divider"></div>

          <div className="contact-method">
            <h2 className="contact-label">SOCIAL</h2>
            <div className="contact-links">
              <a
                href="https://github.com/brennankapollock"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span className="contact-social-platform">GITHUB</span>
                <span className="contact-social-arrow">→</span>
              </a>
              <a
                href="https://twitter.com/brennankapollock"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span className="contact-social-platform">TWITTER</span>
                <span className="contact-social-arrow">→</span>
              </a>
              <a
                href="https://are.na/brennankapollock"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span className="contact-social-platform">ARE.NA</span>
                <span className="contact-social-arrow">→</span>
              </a>
              <a
                href="https://linkedin.com/in/brennankapollock"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
              >
                <span className="contact-social-platform">LINKEDIN</span>
                <span className="contact-social-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="contact-divider"></div>

          <div className="contact-method">
            <h2 className="contact-label">AVAILABILITY</h2>
            <div className="contact-status">
              <div className="contact-status-item">
                <span className="contact-status-indicator contact-status-indicator--active"></span>
                <span className="contact-status-text">Available for new projects</span>
              </div>
              <div className="contact-status-item">
                <span className="contact-status-indicator contact-status-indicator--limited"></span>
                <span className="contact-status-text">Limited consulting slots for 2025</span>
              </div>
            </div>
            <p className="contact-description">
              Currently accepting challenging projects that push boundaries.
              Whether you're a startup establishing identity or an established
              company modernizing your digital presence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}