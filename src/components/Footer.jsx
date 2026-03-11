import TornEdge from "@/components/ui/TornEdge";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <TornEdge position="top" color="var(--color-bg)" />

      <div className="footer-inner">
        <div className="container-site">
          {/* Large contact email */}
          <div className="footer-email">
            <a
              href="mailto:hello@brennankapollock.com"
              className="footer-email-link"
            >
              hello@brennankapollock.com
            </a>
          </div>

          {/* Two column layout */}
          <div className="footer-grid">
            {/* Directory listing style links */}
            <div className="footer-directory">
              <span className="footer-directory-label">CONNECT /</span>
              <div className="footer-directory-links">
                <a
                  className="footer-directory-link"
                  href="https://github.com/brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="footer-directory-link"
                  href="https://youtube.com/@brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
                <a
                  className="footer-directory-link"
                  href="https://lu.ma/brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meetups
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="footer-availability">
              <div className="footer-status">
                <span className="footer-status-dot" />
                <span className="footer-status-text">
                  Available for projects
                </span>
              </div>
              <p className="footer-status-detail">
                Open to new opportunities in design and development. Currently
                accepting projects for {currentYear + 1}.
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {currentYear} Brennan Kapollock
            </p>
            <p className="footer-location">
              <span className="footer-year">{currentYear}</span>
              <span className="footer-sep">&mdash;</span>
              <span>Venice Beach, CA</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
