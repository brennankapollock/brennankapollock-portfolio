"use client";

export default function BlogPostMetadata({ post }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(post.title);

  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="blog-post-metadata">
      <div className="blog-metadata-section">
        <h3 className="blog-metadata-title">/ METADATA</h3>
      </div>

      <div className="blog-metadata-group">
        <div className="blog-metadata-item">
          <div className="blog-metadata-label">DATE:</div>
          <div className="blog-metadata-value">{post.date}</div>
        </div>

        <div className="blog-metadata-item">
          <div className="blog-metadata-label">AUTHOR:</div>
          <div className="blog-metadata-value">{post.author}</div>
        </div>

        <div className="blog-metadata-item">
          <div className="blog-metadata-label">READING TIME:</div>
          <div className="blog-metadata-value">{post.readingTime}</div>
        </div>

        <div className="blog-metadata-item">
          <div className="blog-metadata-label">CATEGORIES:</div>
          <div className="blog-metadata-value">
            {post.categories.map((category, index) => (
              <span key={category} className="blog-category-tag">
                {category}
                {index < post.categories.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>

        <div className="blog-metadata-item">
          <div className="blog-metadata-label">SHARE:</div>
          <div className="blog-metadata-value blog-share-buttons">
            <button
              onClick={() => handleShare("twitter")}
              className="blog-share-button"
            >
              Twitter/X
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="blog-share-button"
            >
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
