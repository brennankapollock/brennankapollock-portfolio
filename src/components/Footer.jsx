export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="editorial-footer">
      <div className="footer-content">
        <div className="footer-left">
          <a
            href="mailto:hello@brennankapollock.com"
            className="footer-email-link"
          >
            hello@brennankapollock.com
          </a>
          <p className="footer-copyright">
            &copy; {currentYear} Brennan Kapollock &mdash; Venice Beach, CA
          </p>
        </div>
        <div className="footer-links">
          <a
            className="footer-link"
            href="https://github.com/brennankapollock"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="footer-link"
            href="https://youtube.com/@brennankapollock"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
          <a
            className="footer-link"
            href="https://lu.ma/brennankapollock"
            target="_blank"
            rel="noopener noreferrer"
          >
            Meetups
          </a>
        </div>
      </div>
    </footer>
  );
}
