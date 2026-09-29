/** Slow scrolling strip. Speed: --marquee-duration in globals.css. Pauses on hover (CSS). */
export default function Marquee({ items }: { items: string[] }) {
  const all = [...items, ...items];
  return (
    <div className="marquee" aria-label="Institutions and journals">
      <div className="marquee-track">
        {all.map((t, i) => (
          <span key={i} className="marquee-item" aria-hidden={i >= items.length}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
