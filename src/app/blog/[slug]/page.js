import { getPostBySlug, blogPosts } from '@/data/blogPosts';
import BlogPostMetadata from '@/components/BlogPostMetadata';

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="blog-post-layout">
        <div className="blog-post-not-found">
          <h1>Post not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-layout">
      <div className="blog-post-hero">
        <h1 className="blog-post-hero-title">{post.title}</h1>
      </div>

      <div className="blog-post-two-col">
        <aside className="blog-post-aside">
          <BlogPostMetadata post={post} />
        </aside>
        <main className="blog-post-main">
          <div className="blog-post-content">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;

              if (paragraph.startsWith('# ')) {
                return <h2 key={index} className="blog-content-h1">{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="blog-content-h2">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="blog-content-h3">{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h4 key={index} className="blog-content-h4">{paragraph.replace(/\*\*/g, '')}</h4>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="blog-content-li">{paragraph.replace('- ', '')}</li>;
              }
              if (/^\d+\./.test(paragraph)) {
                return <li key={index} className="blog-content-li">{paragraph.replace(/^\d+\.\s/, '')}</li>;
              }

              return <p key={index} className="blog-content-p">{paragraph}</p>;
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
