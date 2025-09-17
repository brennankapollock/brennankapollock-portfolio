import Link from 'next/link';

const BLOCKS = [
  { id: 'b1', type: 'image', src: '/placeholder.svg', alt: 'Inspiration 1', w: 800, h: 600 },
  { id: 'b2', type: 'link', href: '#', title: 'Essay: On editorial cropping' },
  { id: 'b3', type: 'text', text: '“Design is the silent ambassador of your brand.” — Paul Rand' },
  { id: 'b4', type: 'image', src: '/placeholder.svg', alt: 'Inspiration 2', w: 900, h: 600 },
  { id: 'b5', type: 'link', href: '#', title: 'Stripe Dev Blog: Anatomy of a list' },
  { id: 'b6', type: 'image', src: '/placeholder.svg', alt: 'Inspiration 3', w: 600, h: 600 },
  { id: 'b7', type: 'text', text: 'Notes on thick rules and bands in museum design systems.' },
];

export default function StashGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {BLOCKS.map(block => (
        <div key={block.id} className="border border-black/10 rounded overflow-hidden bg-white">
          {block.type === 'image' && (
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-auto"
              loading="lazy"
            />
          )}
          {block.type === 'link' && (
            <Link href={block.href} className="block p-3 link">
              {block.title}
            </Link>
          )}
          {block.type === 'text' && (
            <div className="p-3 text-sm text-gray-700">
              {block.text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}