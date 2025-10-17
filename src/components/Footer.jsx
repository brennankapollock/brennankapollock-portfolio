export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20">
      {/* Top rule */}
      <div className="rule-thick mb-8"></div>

      <div className="container-site pb-16">
        {/* Main footer content */}
        <div className="editorial-grid mb-12">
          {/* Contact info */}
          <div className="col-span-12 md:col-span-6">
            <h3 className="display-xl mb-6">Get in touch</h3>
            <div className="space-y-3">
              <div>
                <a
                  className="link copy-lg"
                  href="mailto:hello@brennankapollock.com"
                >
                  hello@brennankapollock.com
                </a>
              </div>
              <div className="flex gap-4 text-sm">
                <a className="link" href="#" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <span className="text-gray-300">/</span>
                <a className="link" href="#" target="_blank" rel="noreferrer">
                  Twitter
                </a>
                <span className="text-gray-300">/</span>
                <a className="link" href="#" target="_blank" rel="noreferrer">
                  Are.na
                </a>
                <span className="text-gray-300">/</span>
                <a className="link" href="#" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="col-span-12 md:col-span-6">
            <div className="md:text-right">
              <div className="accent-green px-4 py-2 inline-block mb-4">
                <span className="text-sm font-medium">
                  Available for projects
                </span>
              </div>
              <p className="text-gray-600">
                Open to new opportunities in design and development. Currently
                accepting projects for {currentYear + 1}.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-8 border-t border-black/5">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} Brennan Kapollock. Portfolio built with Next.js &
            Tailwind.
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-mono">{currentYear}</span>
            <span className="mx-2">—</span>
            <span>Based in [Location]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
