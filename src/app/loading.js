export default function Loading() {
  return (
    <div className="container py-24">
      <div className="flex items-center gap-3 text-foreground-subtle">
        <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
        <span>Loading…</span>
      </div>
    </div>
  );
}
