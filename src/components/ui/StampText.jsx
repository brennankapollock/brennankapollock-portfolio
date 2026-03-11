export default function StampText({
  children,
  color = "var(--color-accent-red)",
  className = "",
  rotate = null,
  variant = "outline",
}) {
  // Default rotation: slight random tilt. Since this is not "use client",
  // use a deterministic default based on text length to avoid hydration mismatch.
  const defaultRotate =
    typeof children === "string" ? ((children.length * 7 + 3) % 7) - 3 : -2;
  const deg = rotate !== null ? rotate : defaultRotate;

  const isFilled = variant === "filled";

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-departure-mono)",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        border: `2px solid ${color}`,
        padding: "0.25em 0.75em",
        transform: `rotate(${deg}deg)`,
        opacity: 0.85,
        color: isFilled ? "var(--color-bg)" : color,
        backgroundColor: isFilled ? color : "transparent",
        lineHeight: 1.4,
      }}
    >
      {children}
    </span>
  );
}
