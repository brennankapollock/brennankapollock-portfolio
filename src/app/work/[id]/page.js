export default function WorkDetailPage({ params }) {
  const { id } = params;
  return (
    <div className="container py-24">
      <h1>Project #{id}</h1>
      <p className="max-w-2xl">
        Case study detail coming soon. This will include hero, overview,
        narrative, media blocks, and credits.
      </p>
    </div>
  );
}
