import BlogList from '@/components/BlogList';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="editorial-grid mb-8">
        <div className="col-span-12 md:col-span-8">
          <h1 className="display-hero">Blog</h1>
          <p className="copy-lg text-gray-600 mt-4 max-w-2xl">
            Thoughts on design, development, and digital culture.
            Editorial rhythm inspired by clean publication design.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <div className="accent-yellow px-3 py-2 text-sm font-medium rotate-2 inline-block">
            71 articles
          </div>
        </div>
      </div>

      <div className="rule-thick mb-8"></div>

      <BlogList />
    </div>
  );
}
