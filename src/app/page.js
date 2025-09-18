import Link from "next/link";

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
        </div>
      </div>
    </div>
  );
}
