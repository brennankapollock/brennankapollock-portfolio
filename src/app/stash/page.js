import StashGrid from '@/components/StashGrid';

export const metadata = {
  title: 'Stash',
};

export default function StashPage() {
  return (
    <div className="py-10 md:py-16">
      <div className="editorial-grid mb-8">
        <div className="col-span-12 md:col-span-8">
          <h1 className="display-hero">Stash</h1>
          <p className="copy-lg text-gray-600 mt-4 max-w-2xl">
            An Are.na-inspired collection of visual research, design explorations,
            and cultural references. A curated mix of inspiration and process.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 flex items-end justify-start md:justify-end">
          <div className="accent-yellow px-3 py-2 text-sm font-medium rotate-3 inline-block">
            Mixed blocks
          </div>
        </div>
      </div>

      <div className="rule-thick mb-8"></div>

      <StashGrid />
    </div>
  );
}