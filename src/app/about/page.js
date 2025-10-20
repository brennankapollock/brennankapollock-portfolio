export const metadata = {
  title: "WHO?",
};

export default function AboutPage() {
  return (
    <div className="editorial-layout">
      <div className="editorial-container">
        {/* Hero Title */}
        <div className="who-hero">
          <h1 className="who-title">WHO?</h1>
        </div>

        {/* Section 01: Introduction */}
        <div className="about-section">
          <div className="about-row">
            <div className="about-content">
              <div className="section-number">01 — THE BASICS</div>
              <p>
                I'm Brennan Kapollock—an engineer, artist, and what some might
                call a hillbilly philosopher. I build things that matter: web
                applications that solve real problems, creative projects that
                challenge conventions, and ideas that bridge the gap between
                technology and humanity.
              </p>
              <p>
                Currently based in Venice Beach, I spend my days writing code,
                thinking deeply about systems and design, and creating things
                that live at the intersection of craft and innovation.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">Portrait</div>
            </div>
          </div>
        </div>

        {/* Section 02: The Work */}
        <div className="about-section">
          <div className="about-row">
            <div className="about-content">
              <div className="section-number">02 — THE WORK</div>
              <p>
                My engineering practice centers on building elegant,
                performant web applications using modern JavaScript. I work
                primarily with Next.js, React, and Node.js, but I'm more
                interested in solving problems than being dogmatic about tools.
                Good software is about understanding the problem deeply, not
                just applying frameworks.
              </p>
              <p>
                I'm currently building Sun Rot Studios—a creative studio
                focused on independent projects that push boundaries. Whether
                it's a web app, an art installation, or something that doesn't
                fit neatly into categories, I'm interested in work that makes
                people think differently.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">At Work</div>
            </div>
          </div>
        </div>

        {/* Section 03: The Philosophy */}
        <div className="about-section">
          <div className="about-row">
            <div className="about-content">
              <div className="section-number">03 — THE PHILOSOPHY</div>
              <p>
                I believe the best work happens when you strip away the noise
                and focus on what's essential. Clean code, clear thinking, and
                honest craft—that's the foundation. Everything else is just
                decoration.
              </p>
              <p>
                The "hillbilly philosopher" part? That's about staying grounded
                while reaching high. It's about building complex systems without
                losing sight of simple truths. It's knowing when to use
                cutting-edge tech and when a straightforward solution is better.
                Wisdom isn't about complexity—it's about clarity.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">Thinking</div>
            </div>
          </div>
        </div>

        {/* Section 04: Beyond Code */}
        <div className="about-section">
          <div className="about-row">
            <div className="about-content">
              <div className="section-number">04 — BEYOND CODE</div>
              <p>
                When I'm not coding, you'll find me exploring ideas through
                writing, photography, and experimental projects that don't
                always make sense on paper but feel right in practice. I run
                meetups, share knowledge on YouTube, and believe strongly in
                building in public.
              </p>
              <p>
                I collect inspiration obsessively—design, art, music, obscure
                technical documentation, random conversations. It all feeds back
                into the work. Creativity isn't a separate discipline; it's a
                lens for seeing problems differently.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">Creating</div>
            </div>
          </div>
        </div>

        {/* Section 05: Let's Connect */}
        <div className="about-section">
          <div className="about-row">
            <div className="about-content">
              <div className="section-number">05 — LET'S CONNECT</div>
              <p>
                I'm always interested in collaborating on meaningful projects,
                discussing ideas, or just connecting with people who give a damn
                about their craft. Whether you're building something ambitious,
                stuck on a technical problem, or want to talk philosophy over
                coffee, reach out.
              </p>
              <p>
                Find me on{" "}
                <a
                  href="https://github.com/brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  GitHub
                </a>
                , watch my process on{" "}
                <a
                  href="https://youtube.com/@brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  YouTube
                </a>
                , or come to one of my{" "}
                <a
                  href="https://lu.ma/brennankapollock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  meetups
                </a>
                . The best conversations happen when we're building something
                together.
              </p>
            </div>
            <div className="about-image">
              <div className="about-image-placeholder">Connect</div>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="about-closing">
          <p className="about-closing-text">
            Building with purpose, creating with intention, thinking without
            boundaries.
          </p>
        </div>
      </div>
    </div>
  );
}
