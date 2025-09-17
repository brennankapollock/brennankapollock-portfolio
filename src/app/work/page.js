import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Work',
};

const PROJECTS = [
  { id: 'w1', title: 'Digital Publication System', subtitle: 'Editorial platform for modern publishing', image: '/placeholder-work-1.jpg', href: '/work/w1' },
  { id: 'w2', title: 'Museum Collection Interface', subtitle: 'Discovering art through curated digital experiences', image: '/placeholder-work-2.jpg', href: '/work/w2' },
  { id: 'w3', title: 'Typography Workshop', subtitle: 'Interactive learning platform for type design', image: '/placeholder-work-3.jpg', href: '/work/w3' },
];

export default function WorkPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="editorial-grid mb-8">
        <div className="col-span-12 md:col-span-8">
          <h1 className="display-hero">Work</h1>
          <p className="copy-lg text-gray-600 mt-4 max-w-2xl">
            Selected projects spanning design systems, digital experiences,
            and editorial interfaces. Each case study explores the intersection
            of design and development.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <div className="accent-green px-3 py-2 text-sm font-medium -rotate-1 inline-block">
            3 case studies
          </div>
        </div>
      </div>

      <div className="rule-thick mb-12"></div>

      <div className="space-y-16">
        {PROJECTS.map((project, idx) => (
          <FadeIn key={project.id}>
            <div className="editorial-grid">
              <div className="col-span-12 lg:col-span-8">
                <a href={project.href} className="group block">
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transform-gpu transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View case study →
                    </div>
                  </div>
                </a>
              </div>

              <div className="col-span-12 lg:col-span-4 flex flex-col justify-center">
                <div className="lg:pl-8">
                  <h2 className="display-xl mb-3">
                    <a href={project.href} className="link">
                      {project.title}
                    </a>
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {project.subtitle}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 font-mono">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <a href={project.href} className="link text-sm font-medium">
                      Case Study
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

