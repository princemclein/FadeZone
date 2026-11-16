import { useState } from "react";
import highFade from "../assets/gallery-section-images/high-fade.jpg";
import midFade from "../assets/gallery-section-images/mid-fade.jpg";
import taperFade from "../assets/gallery-section-images/taper-fade.jpg";
import buzzcut from "../assets/gallery-section-images/buzz-cut.jpg";
import Container from "../components/Container";

const ALL_HAIRCUTS = [
  {
    code: "STYLE 01",
    name: "Buzz Cut",
    category: "Classic",
    length: "Short / Guard #1–#3",
    description:
      "Clean, uniform clip all around with sharp temple and neck line-up.",
    image: buzzcut,
  },
  {
    code: "STYLE 02",
    name: "Mid Fade",
    category: "Fades",
    length: "Medium Blend",
    description:
      "Balanced transition starting midway up the sides into textured top length.",
    image: midFade,
  },
  {
    code: "STYLE 03",
    name: "High Fade",
    category: "Fades",
    length: "High Contrast",
    description:
      "Bold, tight skin-to-length gradient set high near the temples for maximum sharpness.",
    image: highFade,
  },
  {
    code: "STYLE 04",
    name: "Taper Fade",
    category: "Tapers",
    length: "Natural Outline",
    description:
      "Gradual blend focused cleanly around the sideburns and nape while keeping side fullness.",
    image: taperFade,
  },
];

const CATEGORIES = ["All", "Fades", "Tapers", "Classic"];

function LookbookCard({ item, onPreview }) {
  return (
    <article className="group relative flex flex-col border border-fadezone-accent/40 bg-fadezone-surface/90 text-fadezone-text transition-colors hover:border-fadezone-accent">
      {/* Top Vintage Catalog Header */}
      <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-3 py-2 sm:px-4">
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent sm:text-[11px]">
          {item.code}
        </span>
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/70 sm:text-[11px]">
          ₱150
        </span>
      </div>

      {/* Framed Portrait with Inner Matting */}
      <div className="p-2.5 pb-0 sm:p-3.5 sm:pb-0">
        <button
          type="button"
          onClick={() => onPreview(item)}
          aria-label={`Inspect ${item.name}`}
          className="relative block aspect-4/5 w-full overflow-hidden border border-fadezone-text/15 bg-fadezone-background text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-accent"
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Subtle vintage corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-fadezone-text/60" />

          {/* Category Stamp Overlay */}
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 border border-fadezone-accent/50 bg-fadezone-background/85 px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
            {item.category}
          </span>
        </button>
      </div>

      {/* Card Footer */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div>
          <h2 className="font-heading text-xl uppercase leading-none tracking-wide text-fadezone-text sm:text-2xl">
            {item.name}
          </h2>
          <p className="mt-1.5 font-body text-[11px] uppercase tracking-[0.18em] text-fadezone-text/60">
            {item.length}
          </p>
          <div className="mt-2.5 border-t border-dashed border-fadezone-text/25" />
        </div>

        <a
          href="/booking"
          className="group/btn flex items-center justify-between border border-fadezone-accent/60 bg-fadezone-background/60 px-3 py-2.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent hover:text-fadezone-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:px-4 sm:text-xs"
        >
          <span>Book Cut</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default function AllGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCut, setSelectedCut] = useState(null);

  const filteredHaircuts =
    activeCategory === "All"
      ? ALL_HAIRCUTS
      : ALL_HAIRCUTS.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen border-t border-fadezone-accent/30 bg-fadezone-texture py-14 text-fadezone-text sm:py-20 lg:py-24">
      <Container>
        {/* Top Breadcrumb / Back Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-5">
          <a
            href="/#gallery"
            className="group inline-flex items-center gap-2.5 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text/80 transition-colors hover:text-fadezone-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Home</span>
          </a>

          <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
            CATALOG ARCHIVE • {filteredHaircuts.length} STYLES
          </span>
        </div>

        {/* Editorial Vintage Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Complete Style Chart • Flat Rate ₱150
              </p>
            </div>

            <h1 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              The Full{" "}
              <span className="text-fadezone-accent">FadeZone Lookbook.</span>
            </h1>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            Browse our full lineup of classic cuts, tapers, and skin fades. Tap
            any plate to inspect details or lock in your chair for ₱150.
          </p>
        </div>

        {/* Vintage Tab Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-6">
          <div
            role="tablist"
            aria-label="Filter haircuts by category"
            className="flex flex-wrap gap-2.5"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`border px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                      : "border-fadezone-accent/40 bg-fadezone-surface/80 text-fadezone-text/80 hover:border-fadezone-accent hover:text-fadezone-text"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <span className="font-body text-[11px] uppercase tracking-[0.22em] text-fadezone-text/60">
            Subic, Zambales • Open 10 AM – 10 PM
          </span>
        </div>

        {/* Catalog Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {filteredHaircuts.map((item) => (
            <LookbookCard
              key={item.code}
              item={item}
              onPreview={setSelectedCut}
            />
          ))}
        </div>

        {/* Vintage Ticket Footer */}
        <div className="mt-14 border-t border-dashed border-fadezone-text/25 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div>
              <p className="font-heading text-lg tracking-[0.2em] text-fadezone-accent sm:text-xl">
                DON’T SEE YOUR EXACT STYLE?
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-fadezone-text/70">
                Bring a reference photo—any cut is still ₱150.
              </p>
            </div>

            <a
              href="/booking"
              className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:w-auto"
            >
              <span>Claim Your Chair</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </Container>

      {/* Vintage Plate Lightbox / Quick Preview Modal */}
      {selectedCut && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCut.name}
          onClick={() => setSelectedCut(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-fadezone-background/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl border border-fadezone-accent/60 bg-fadezone-surface text-fadezone-text"
          >
            {/* Corner Viewfinder Brackets */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-fadezone-accent" />
            <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-fadezone-accent" />
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-fadezone-accent" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-fadezone-accent" />

            {/* Modal Stub Top Bar */}
            <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-5 py-3.5">
              <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                {selectedCut.code} • {selectedCut.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedCut(null)}
                aria-label="Close preview"
                className="border border-fadezone-text/25 px-2.5 py-1 font-body text-xs font-bold uppercase tracking-widest text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Content Split */}
            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
              <div className="aspect-4/5 overflow-hidden border border-fadezone-text/20 bg-fadezone-background">
                <img
                  src={selectedCut.image}
                  alt={selectedCut.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                    Standard Service • ₱150
                  </span>
                  <h2 className="mt-2 font-heading text-3xl uppercase leading-none tracking-wide sm:text-4xl">
                    {selectedCut.name}
                  </h2>

                  <div className="my-4 border-t border-dashed border-fadezone-text/25" />

                  <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                    Spec: {selectedCut.length}
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-fadezone-text/80">
                    {selectedCut.description}
                  </p>
                </div>

                <div className="mt-6 pt-4">
                  <a
                    href="/booking"
                    className="group flex w-full items-center justify-between border border-fadezone-accent bg-fadezone-accent px-5 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
                  >
                    <span>Book This Cut</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
