import { useState, useRef, useCallback } from "react";
import Anama from "@/imports/Anama011/index";

const photos = [
  { id: "photo-1486325212027-8081e485255e", alt: "Architecture interior with dramatic light" },
  { id: "photo-1448375240586-882707db888b", alt: "Forest path through tall trees" },
  { id: "photo-1505118380757-91f5f5632de0", alt: "Ocean coastline at dusk" },
  { id: "photo-1509316785289-025f5b846b35", alt: "Desert dunes under open sky" },
  { id: "photo-1477959858617-67f85cf4f1df", alt: "City skyline at night" },
  { id: "photo-1464822759023-fed622ff2c3b", alt: "Mountain landscape with snow peaks" },
];

const services = [
  "Branding",
  "Visual identities",
  "Design systems",
  "Art direction",
  "Editorial design",
  "UX/UI design",
  "Digital design",
  "Motion & interactive design",
];

const T: React.CSSProperties = {
  fontFamily: "'Lora', Georgia, serif",
  lineHeight: "1.6",
  color: "rgba(255,255,255,0.88)",
};

const link: React.CSSProperties = {
  display: "block",
  color: "rgba(255,255,255,0.88)",
  textDecoration: "none",
  pointerEvents: "auto",
  cursor: "pointer",
};

/* The three text blocks rendered once (reused for the infinite loop clone) */
function TextContent() {
  return (
    <>
      {/* Bio + Work/CV */}
      <div style={{ ...T, marginBottom: "2em" }}>
        <div style={{ marginBottom: "1em" }}>
          ANAMA is an artist and visual designer working across branding, design systems, editorial
          and digital design. She combines art direction with system thinking to create clear,
          flexible visual identities across physical and digital environments.
        </div>
        <a href="#" style={link}>Work</a>
        <a href="#" style={link}>CV</a>
      </div>

      {/* Services */}
      <div style={{ ...T, marginBottom: "2em" }}>
        {services.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </div>

      {/* Contact */}
      <div style={T}>
        <div style={{ marginBottom: "0.6em" }}>
          <div>Ana María López Gómez</div>
          <div>Madrid, Spain</div>
        </div>
        <div>
          <div>+34 605 439 246</div>
          <a href="mailto:anama.lopez2000@gmail.com" style={link}>
            anama.lopez2000@gmail.com
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={link}>
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={link}>
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: -20, y: -20 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });
    const zone = Math.min(5, Math.floor((x / rect.width) * 6));
    setActiveIndex(zone);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-screen bg-black cursor-none"
        style={{ overflowX: "hidden" }}
      >
        {/* Background images */}
        {photos.map((photo, i) => (
          <img
            key={photo.id}
            src={`https://images.unsplash.com/${photo.id}?w=1920&h=1080&fit=crop&auto=format`}
            alt={photo.alt}
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: activeIndex === i ? 1 : 0,
              transition: "opacity 0.05s ease",
              zIndex: 0,
            }}
          />
        ))}

        {/* Dark overlay */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.38)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Vignette */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* ── DESKTOP layout (>1024px) ── */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "flex-end",
            padding: "0 40px 40px 40px",
            gap: 0,
          }}
          className="hidden-mobile"
        >
          {/* 3-column text grid */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 0,
            }}
          >
            {/* Col 1 — Bio + Work/CV */}
            <div style={{ ...T, fontSize: "10pt", paddingRight: "32px" }}>
              <div style={{ marginBottom: "1em" }}>
                ANAMA is an artist and visual designer working across branding, design systems,
                editorial and digital design. She combines art direction with system thinking to
                create clear, flexible visual identities across physical and digital environments.
              </div>
              <a href="#" style={link}>Work</a>
              <a href="#" style={link}>CV</a>
            </div>

            {/* Col 2 — Services */}
            <div style={{ ...T, fontSize: "10pt", paddingRight: "16px" }}>
              {services.map((s) => (
                <div key={s}>{s}</div>
              ))}
            </div>

            {/* Col 3 — Contact */}
            <div style={{ ...T, fontSize: "10pt" }}>
              <div style={{ marginBottom: "0.6em" }}>
                <div>Ana María López Gómez</div>
                <div>Madrid, Spain</div>
              </div>
              <div>
                <div>+34 605 439 246</div>
                <a href="mailto:anama.lopez2000@gmail.com" style={link}>
                  anama.lopez2000@gmail.com
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={link}>
                  LinkedIn
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={link}>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Logo — 160×160 square */}
          <a
            href="mailto:anama.lopez2000@gmail.com"
            style={{
              flexShrink: 0,
              width: 160,
              height: 160,
              display: "block",
              pointerEvents: "auto",
            }}
          >
            <Anama />
          </a>
        </div>

        {/* ── MOBILE / TABLET layout (≤1024px) ── */}
        {/* Fixed logo bottom-left */}
        <a
          href="mailto:anama.lopez2000@gmail.com"
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            width: 80,
            height: 80,
            zIndex: 10,
            pointerEvents: "auto",
          }}
          className="show-mobile"
        >
          <Anama />
        </a>

        {/* Mobile text — in document flow, scrolls with the page */}
        <div
          className="show-mobile"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: 0,
            paddingBottom: "221px",
            paddingLeft: "28px",
            paddingRight: "24px",
            fontSize: "18px",
            marginTop: "100svh",
          }}
        >
          <TextContent />
        </div>

        {/* Custom cursor dot */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            pointerEvents: "none",
            zIndex: 9999,
            transform: `translate(${cursor.x - 4}px, ${cursor.y - 4}px)`,
            transition: "transform 0.05s linear",
          }}
        />
      </div>

    </>
  );
}
