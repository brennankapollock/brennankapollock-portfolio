export default function BlogDetailPage({ params }) {
  const { id } = params;
  return (
    <div className="container py-24">
      <h1>Post #{id}</h1>
      <p className="max-w-2xl">
        Article content coming soon. This will include headings, code blocks
        with syntax highlighting, callouts, and next/previous links.
      </p>
    </div>
  );
}
