import Link from "next/link";
import Image from "next/image";

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
    date,
  } = item;

  const isMusic =
    Array.isArray(item?.categories) && item.categories.includes("music");
  const isBook =
    Array.isArray(item?.categories) && item.categories.includes("books");

  // Base card classes with optional category modifiers
  const baseClasses = ["stash-card", `stash-card--${type}`];
  if (isMusic) baseClasses.push("stash-card--album");
  if (isBook) baseClasses.push("stash-card--book");
  const cardClasses = baseClasses.join(" ");

  // Specialized Album (Music) card
  if (isMusic) {
    const Wrapper = url ? "a" : "div";
    const wrapperProps = url
      ? {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cardClasses,
        }
      : { className: cardClasses };

    return (
      <Wrapper {...wrapperProps}>
        <div className="album-cover">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Album"}
              loading="lazy"
              className="album-art"
            />
          ) : (
            <div className="album-art album-art--placeholder" />
          )}
          <div className="album-center-dot" />
        </div>
        <div className="stash-card-content album-meta">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {source && <p className="stash-card-meta">{source}</p>}
        </div>
      </Wrapper>
    );
  }

  // Specialized Book card
  if (isBook) {
    const Wrapper = url ? "a" : "div";
    const wrapperProps = url
      ? {
          href: url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cardClasses,
        }
      : { className: cardClasses };

    return (
      <Wrapper {...wrapperProps}>
        <div className="book-cover">
          <div className="book-spine" />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || "Book"}
              loading="lazy"
              className="book-art"
            />
          ) : (
            <div className="book-art book-art--placeholder" />
          )}
        </div>
        <div className="stash-card-content book-meta">
          {title && <h3 className="stash-card-title">{title}</h3>}
          {source && <p className="stash-card-meta">{source}</p>}
        </div>
      </Wrapper>
    );
  }

  // Image card
  if (type === "image") {
    return (
      <div className={cardClasses}>
        {imageUrl && (
          <div className="stash-card-image">
            <img
              src={imageUrl}
              alt={title || "Stash item"}
              loading="lazy"
              className="stash-card-img"
            />
          </div>
        )}
        {title && (
          <div className="stash-card-content">
            <h3 className="stash-card-title">{title}</h3>
            {description && (
              <p className="stash-card-description">{description}</p>
            )}
            {source && <p className="stash-card-meta">Source: {source}</p>}
          </div>
        )}
      </div>
    );
  }

  // Link card
  if (type === "link") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
      >
        {imageUrl && (
          <div className="stash-card-image">
            <img
              src={imageUrl}
              alt={title || "Link preview"}
              loading="lazy"
              className="stash-card-img"
            />
            <div className="stash-card-link-overlay">
              <span className="stash-card-link-icon">→</span>
            </div>
          </div>
        )}
        <div className="stash-card-content">
          <h3 className="stash-card-title">{title}</h3>
          {description && (
            <p className="stash-card-description">{description}</p>
          )}
          {source && <p className="stash-card-meta">{source}</p>}
        </div>
      </a>
    );
  }

  // Quote card
  if (type === "quote") {
    return (
      <div className={cardClasses}>
        <div className="stash-card-content">
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

  // Text card
  if (type === "text") {
    return (
      <div className={cardClasses}>
        <div className="stash-card-content">
          {title && <h3 className="stash-card-title">{title}</h3>}
          <p className="stash-card-text">{text}</p>
        </div>
      </div>
    );
  }

  // Video card
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
        {title && (
          <div className="stash-card-content">
            <h3 className="stash-card-title">{title}</h3>
            {description && (
              <p className="stash-card-description">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className={cardClasses}>
      <div className="stash-card-content">
        <p>Unsupported card type</p>
      </div>
    </div>
  );
}
