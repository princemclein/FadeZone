import { Link } from "react-router-dom";
import highFade from "../assets/gallery-section-images/high-fade.jpg";
import midFade from "../assets/gallery-section-images/mid-fade.jpg";
import taperFade from "../assets/gallery-section-images/taper-fade.jpg";
import buzzcut from "../assets/gallery-section-images/buzz-cut.jpg";
import Container from "./Container";

const HAIRCUTS = [
  { code: "STYLE 01", name: "Buzz Cut", image: buzzcut },
  { code: "STYLE 02", name: "Mid Fade", image: midFade },
  { code: "STYLE 03", name: "High Fade", image: highFade },
  { code: "STYLE 04", name: "Taper Fade", image: taperFade },
];

function HaircutCard({ code, name, image }) {
  return (
    <article className="group relative flex flex-col border border-fadezone-accent/40 bg-fadezone-surface/90 text-fadezone-text transition-colors hover:border-fadezone-accent">
      {/* Top Vintage Catalog Header */}
      <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-3 py-2 sm:px-4">
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent sm:text-[11px]">
          {code}
        </span>
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/70 sm:text-[11px]">
          ₱150
        </span>
      </div>

      {/* Framed Portrait with Inner Matting */}
      <div className="p-2.5 pb-0 sm:p-3.5 sm:pb-0">
        <div className="relative aspect-4/5 overflow-hidden border border-fadezone-text/15 bg-fadezone-background">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle vintage corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-fadezone-text/60" />
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div>
          <h3 className="font-heading text-xl uppercase leading-none tracking-wide text-fadezone-text sm:text-2xl">
            {name}
          </h3>
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

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 border-t border-fadezone-accent/30 bg-fadezone-texture py-16 text-fadezone-text sm:py-20 lg:scroll-mt-10 lg:py-28"
    >
      <Container>
        {/* Editorial Vintage Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                The Lookbook • Standard Rate ₱150
              </p>
            </div>

            <h2 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              Signature{" "}
              <span className="text-fadezone-accent">Cuts & Fades.</span>
            </h2>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            Choose your preferred cut and claim your chair. Every haircut is a
            flat ₱150—walk-ins are always welcome.
          </p>
        </div>

        {/* 4-Column Catalog Grid */}
        <div className="mt-10 grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-4">
          {HAIRCUTS.map((h) => (
            <HaircutCard key={h.name} {...h} />
          ))}
        </div>

        {/* Vintage Ticket Footer / View All Bar */}
        <div className="mt-12 border-t border-dashed border-fadezone-text/25 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-heading text-base tracking-[0.2em] text-fadezone-accent sm:text-lg">
              FLAT RATE ₱150 • WALK-INS WELCOME
            </p>

            <Link
              to="/gallery"
              className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:w-auto"
            >
              <span>View Full Lookbook</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
