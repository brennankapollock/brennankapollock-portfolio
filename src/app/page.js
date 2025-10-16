import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
<div className="museum-layout">
      {/* Main Title - Edge to Edge */}
      <div className="museum-hero">
        <h1 className="museum-main-title">BRENNAN K.A. POLLOCK</h1>
        <p className="museum-tagline">
          ENGINEER, ARTIST, & HILLBILLY PHILOSOPHER
        </p>
      </div>

      {/* Horizontal Line Separator */}
      <div className="museum-separator"></div>

      {/* Exhibition Lines */}
      <div className="museum-exhibitions">
        <div className="museum-exhibition-line">
          <div className="museum-marquee">
            <div className="museum-marquee-content">
              <span className="museum-line-text">NOW BUILDING: </span>
              <img
                src="/home-images/Image.png"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/work" className="museum-line-link">
                SUN ROT STUDIOS →
              </Link>
              <span className="museum-line-text">NOW BUILDING: </span>
              <img
                src="/home-images/Image.png"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/work" className="museum-line-link">
                SUN ROT STUDIOS →
              </Link>
            </div>
          </div>
          
          {/* Mobile Card Layout */}
          <div className="museum-card-label">
            <span className="museum-card-number">01</span>
            <span>NOW BUILDING</span>
          </div>
          
          <div className="museum-card-image-container">
            <Image
              src="/home-images/Image.png"
              alt="Sun Rot Studios"
              fill
              className="museum-inline-image-mobile"
              sizes="100vw"
            />
          </div>
          
          <Link href="/work" className="museum-card-content">
            <div className="museum-line-link-mobile">
              SUN ROT STUDIOS <span>→</span>
            </div>
            <p className="museum-card-subtitle">
              Explore current work and projects
            </p>
          </Link>
        </div>

        <div className="museum-exhibition-line">
          <div className="museum-marquee">
            <div className="museum-marquee-content">
              <span className="museum-line-text">NOW WRITING: </span>
              <img
                src="/home-images/sexy marvin gaye.jpg"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/blog" className="museum-line-link">
                UNDRAPED IN CLOVER →
              </Link>
              <span className="museum-line-text">NOW WRITING: </span>
              <img
                src="/home-images/sexy marvin gaye.jpg"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/blog" className="museum-line-link">
                UNDRAPED IN CLOVER →
              </Link>
            </div>
          </div>
          
          {/* Mobile Card Layout */}
          <div className="museum-card-label">
            <span className="museum-card-number">02</span>
            <span>NOW WRITING</span>
          </div>
          
          <div className="museum-card-image-container">
            <Image
              src="/home-images/sexy marvin gaye.jpg"
              alt="Undraped in Clover"
              fill
              className="museum-inline-image-mobile"
              sizes="100vw"
            />
          </div>
          
          <Link href="/blog" className="museum-card-content">
            <div className="museum-line-link-mobile">
              UNDRAPED IN CLOVER <span>→</span>
            </div>
            <p className="museum-card-subtitle">
              Read thoughts and reflections
            </p>
          </Link>
        </div>

        <div className="museum-exhibition-line">
          <div className="museum-marquee">
            <div className="museum-marquee-content">
              <span className="museum-line-text">NOW COLLECTING: </span>
              <img
                src="/home-images/woman.png"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/stash" className="museum-line-link">
                SH*T I'M INTO & INSPIRED BY →
              </Link>
              <span className="museum-line-text">NOW COLLECTING: </span>
              <img
                src="/home-images/woman.png"
                alt=""
                className="museum-inline-image"
              />
              <Link href="/stash" className="museum-line-link">
                SHIT I'M INTO & INSPIRED BY →
              </Link>
            </div>
          </div>
          
          {/* Mobile Card Layout */}
          <div className="museum-card-label">
            <span className="museum-card-number">03</span>
            <span>NOW COLLECTING</span>
          </div>
          
          <div className="museum-card-image-container">
            <Image
              src="/home-images/woman.png"
              alt="Sh*t I'm Into & Inspired By"
              fill
              className="museum-inline-image-mobile"
              sizes="100vw"
            />
          </div>
          
          <Link href="/stash" className="museum-card-content">
            <div className="museum-line-link-mobile">
              SH*T I'M INTO & INSPIRED BY <span>→</span>
            </div>
            <p className="museum-card-subtitle">
              Browse inspiration and interests
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
