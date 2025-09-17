export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="editorial-grid mb-12">
        <div className="col-span-12 md:col-span-8">
          <h1 className="display-hero">Contact</h1>
          <p className="copy-lg text-gray-600 mt-4 max-w-2xl">
            Let's start a conversation about your next project,
            collaboration, or just talk about design and development.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <div className="accent-green px-3 py-2 text-sm font-medium -rotate-2 inline-block">
            Available now
          </div>
        </div>
      </div>

      <div className="rule-thick mb-12"></div>

      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-6">
          <div className="space-y-8">
            <div>
              <h2 className="display-xl mb-4">Email</h2>
              <a className="link copy-lg" href="mailto:hello@brennankapollock.com">
                hello@brennankapollock.com
              </a>
              <p className="text-gray-600 mt-2">
                Best for project inquiries, collaborations, and detailed discussions.
                I typically respond within 24 hours.
              </p>
            </div>

            <div>
              <h2 className="display-xl mb-4">Social</h2>
              <div className="space-y-3">
                <div>
                  <a className="link font-medium" href="#" target="_blank" rel="noreferrer">
                    Twitter → @brennankapollock
                  </a>
                  <p className="text-sm text-gray-600">Thoughts on design, development, and digital culture</p>
                </div>
                <div>
                  <a className="link font-medium" href="#" target="_blank" rel="noreferrer">
                    GitHub → brennankapollock
                  </a>
                  <p className="text-sm text-gray-600">Open source projects and code experiments</p>
                </div>
                <div>
                  <a className="link font-medium" href="#" target="_blank" rel="noreferrer">
                    Are.na → brennankapollock
                  </a>
                  <p className="text-sm text-gray-600">Research, inspiration, and visual explorations</p>
                </div>
                <div>
                  <a className="link font-medium" href="#" target="_blank" rel="noreferrer">
                    LinkedIn → brennankapollock
                  </a>
                  <p className="text-sm text-gray-600">Professional background and experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="bg-gray-50 p-8 h-full flex flex-col justify-center">
            <h3 className="display-xl mb-6">Let's work together</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                I'm always interested in challenging projects that push the
                boundaries of design and development. Whether you're a startup
                looking to establish your visual identity or an established
                company wanting to modernize your digital presence.
              </p>
              <p>
                Current availability: <strong>Accepting new projects for 2025</strong>
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm font-medium">Available for new projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span className="text-sm font-medium">Limited consulting availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
