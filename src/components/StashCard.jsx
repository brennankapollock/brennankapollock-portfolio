export default function StashCard({ item }) {
  const {
    type,
    title,
    text,
    author,
    url,
    imageUrl,
    description,
    source,
    subcategory,
  } = item;

  // Determine visual variant based on subcategory
  const getCardVariant = () => {
    if (
      subcategory === "albums" ||
      subcategory === "artists" ||
      subcategory === "performances"
    ) {
      return "album";
    }
    if (
      subcategory === "nonfiction" ||
      subcategory === "fiction" ||
      subcategory === "essays"
    ) {
      return "book";
    }
    if (
      subcategory === "title sequences" ||
      subcategory === "directors" ||
      subcategory === "scenes"
    ) {
      return "film";
    }
    return type; // fallback to type
  };

  const variant = getCardVariant();
  const cardClasses = ["stash-card", `stash-card--${type}`, `stash-card--${variant}`].join(" ");

  // Quote card - text-only, always visible
  if (type === "quote") {
    return (
      <div className={cardClasses}>
        <div className="stash-card-overlay">
          <blockquote className="stash-card-quote">
            <p className="stash-card-quote-text">"{text}"</p>
            {author && (
              <footer className="stash-card-quote-author">— {author}</footer>
            )}
          </blockquote>
        </div>
      </div>
    );
  }

  // Text card - text-only, always visible
  if (type === "text") {
    return (
      <div className={cardClasses}>
        <div className="stash-card-overlay">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {text && <p className="stash-card-text">{text}</p>}
        </div>
      </div>
    );
  }

  // Image card - minimal, text on hover only
  if (type === "image") {
    return (
      <div className={cardClasses}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="stash-card-img"
          />
        )}
        {variant === "album" && <div className="stash-card-cd-spine"></div>}
        {variant === "book" && (
          <div className="stash-card-book-spine">
            <span className="stash-card-book-spine-text">{title}</span>
          </div>
        )}
        <div className="stash-card-overlay">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {description && (
            <p className="stash-card-description">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Link card - minimal, text on hover only
  if (type === "link") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="stash-card-img"
          />
        )}
        {variant === "album" && <div className="stash-card-cd-spine"></div>}
        {variant === "book" && (
          <div className="stash-card-book-spine">
            <span className="stash-card-book-spine-text">{title}</span>
          </div>
        )}
        {variant === "film" && <div className="stash-card-film-frame"></div>}
        <div className="stash-card-overlay">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {description && (
            <p className="stash-card-description">{description}</p>
          )}
          {source && <p className="stash-card-source">{source}</p>}
        </div>
      </a>
    );
  }

  // Video card - show video, minimal text on hover
  if (type === "video") {
    return (
      <div className={cardClasses}>
        {url && (
          <div className="stash-card-video">
            <iframe
              src={url}
              title={title || "Video"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="stash-card-video-iframe"
              loading="lazy"
            />
          </div>
        )}
        <div className="stash-card-overlay">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {description && (
            <p className="stash-card-description">{description}</p>
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={cardClasses}>
      <div className="stash-card-overlay">
        <p>Unsupported type</p>
      </div>
    </div>
  );
}
