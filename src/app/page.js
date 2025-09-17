import Link from 'next/link';

export const metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="editorial-grid">
          {/* Main name typography - spanning most columns */}
          <div className="col-span-12 lg:col-span-10">
            <h1 className="display-hero-xl cropped">
              BRENNAN
              <br />
              KAPOLLOCK
            </h1>
          </div>

          {/* Accent element */}
          <div className="col-span-12 lg:col-span-2 lg:col-start-11 flex items-start">
            <div className="accent-yellow px-4 py-2 text-sm font-medium rotate-3 inline-block">
              Portfolio
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="editorial-grid mt-8">
          <div className="col-span-12 md:col-span-6">
            <p className="copy-lg text-gray-600">
              Designer & developer focused on editorial scale,
              clean typography, and thoughtful digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-16">
        <div className="rule-thick mb-8"></div>

        <div className="editorial-grid">
          {/* Work */}
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <h2 className="display-xl mb-4">Work</h2>
            <p className="text-gray-600 mb-4">
              Selected projects and case studies showcasing design and development.
            </p>
            <Link href="/work" className="link font-medium">
              View projects →
            </Link>
          </div>

          {/* Blog */}
          <div className="col-span-12 md:col-span-4 mb-8 md:mb-0">
            <h2 className="display-xl mb-4">Blog</h2>
            <p className="text-gray-600 mb-4">
              Thoughts on design, development, and digital culture.
            </p>
            <Link href="/blog" className="link font-medium">
              Read articles →
            </Link>
          </div>

          {/* About */}
          <div className="col-span-12 md:col-span-4">
            <h2 className="display-xl mb-4">
              About
              <span className="accent-green px-2 py-1 text-base ml-2 inline-block rotate-1">
                ✓
              </span>
            </h2>
            <p className="text-gray-600 mb-4">
              Background, experience, and what drives my creative practice.
            </p>
            <Link href="/about" className="link font-medium">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Band */}
      <section className="band">
        <div className="band-row">
          Available for new projects
        </div>
        <div className="band-row">
          <Link href="/contact" className="link">
            Get in touch
          </Link>
        </div>
        <div className="band-row">
          Currently based in [Location]
        </div>
      </section>
    </>
  );
}

