import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="editorial-grid mb-12">
        <div className="col-span-12 md:col-span-8">
          <h1 className="display-hero">About</h1>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <div className="accent-red px-3 py-2 text-sm font-medium rotate-1 inline-block text-white">
            Designer & Developer
          </div>
        </div>
      </div>

      <div className="rule-thick mb-12"></div>

      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-8">
          <FadeIn>
            <p className="copy-lg mb-6">
              I'm a designer-engineer focused on editorial interfaces, interaction rhythm,
              and robust front-end systems. My practice sits at the intersection of design
              and development, exploring how thoughtful typography and clean code can create
              meaningful digital experiences.
            </p>

            <p className="copy-lg mb-6">
              This portfolio explores patterns informed by cultural institutions like
              Stedelijk Museum's bold visual identity, editorial publications with clean
              information architecture, and modern development practices that prioritize
              both performance and aesthetics.
            </p>

            <p className="text-gray-600 mb-8">
              Currently building digital experiences that bridge the gap between
              art, design, and technology. Based in [Location], working with clients
              and collaborators worldwide.
            </p>
          </FadeIn>

          <FadeIn className="mt-8">
            <div className="space-y-6">
              <div>
                <h2 className="display-xl mb-4">Approach</h2>
                <p className="text-gray-600">
                  Every project begins with understanding the content, audience, and context.
                  I believe in designing systems that scale gracefully, code that reads like
                  prose, and interfaces that feel both familiar and surprising.
                </p>
              </div>

              <div>
                <h2 className="display-xl mb-4">Tools & Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'Framer', 'Node.js', 'PostgreSQL'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-100 text-sm font-mono rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <FadeIn>
            <div className="bg-gray-50 p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg">Currently</h3>
              <ul className="space-y-2 text-sm">
                <li>Building design systems at [Company]</li>
                <li>Exploring generative typography</li>
                <li>Reading about museum curation</li>
                <li>Writing about interface patterns</li>
              </ul>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium mb-2">Get in touch</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Available for select projects and collaborations.
                </p>
                <a href="/contact" className="link font-medium">
                  Start a conversation →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
