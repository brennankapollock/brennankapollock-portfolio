'use client';

import Link from 'next/link';

const POSTS = [
  { id: 'p1', date: '2025-08-01', name: 'Designing editorial scale on the web', href: '#' },
  { id: 'p2', date: '2025-07-18', name: 'Subtle motion: when and how', href: '#' },
  { id: 'p3', date: '2025-06-30', name: 'Cropping for impact: Possible Monuments study', href: '#' },
  { id: 'p4', date: '2025-06-12', name: 'Rhythm in lists: notes on Stripe Dev Blog', href: '#' },
];

const FILTERS = [
  { id: 'all', label: 'All', count: POSTS.length },
  { id: 'design', label: 'Design', count: 2 },
  { id: 'engineering', label: 'Engineering', count: 1 },
  { id: 'notes', label: 'Notes', count: 1 },
];

export default function BlogList() {
  return (
    <div className="grid gap-8 md:grid-cols-12">
      {/* Left filters column */}
      <aside className="md:col-span-4">
        <div className="sticky top-20">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">/ Filters</h2>
          <ul className="space-y-2">
            {FILTERS.map(f => (
              <li key={f.id} className="flex items-center justify-between">
                <span className="link">{f.label}</span>
                <span className="text-xs text-gray-500">{f.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Right list column */}
      <section className="md:col-span-8">
        {/* Header row */}
        <div className="flex text-xs uppercase tracking-widest text-gray-500 pb-2">
          <div className="w-28">/ Date</div>
          <div className="flex-1">/ Name</div>
          <div className="w-8 text-right" aria-hidden="true"></div>
        </div>
        <div className="hr-hairline" />

        {/* Rows */}
        <ul role="list">
          {POSTS.map((post, idx) => (
            <li key={post.id} className="border-b border-black/10">
              <div className="flex items-center gap-4 py-4 group">
                <div className="w-28 text-sm text-gray-600 tabular-nums">{post.date}</div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <Link href={post.href} className="link blog-post-title">{post.name}</Link>
                </div>
                <div className="w-8 flex justify-end">
                  <button
                    type="button"
                    aria-label="Expand"
                    className="w-6 h-6 rounded border border-black/10 text-gray-600 group-hover:text-black transition"
                    onClick={() => {}}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}