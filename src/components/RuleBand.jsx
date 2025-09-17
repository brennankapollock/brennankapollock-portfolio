export default function RuleBand({ label, className = '' }) {
  return (
    <div className={`w-full my-10 ${className}`}>
      <div className="rule-thick" role="separator" aria-hidden="true" />
      {label ? (
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs tracking-widest uppercase text-gray-500">/ {label}</span>
        </div>
      ) : null}
    </div>
  );
}