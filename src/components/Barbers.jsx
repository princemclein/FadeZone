import barber1 from "../assets/barbers-section-images/MelbenJay.jpg";
import barber2 from "../assets/barbers-section-images/SiegfredOpiana.jpg";
import barber3 from "../assets/barbers-section-images/MarkEito.jpg";
import Container from "./Container";

const BARBERS = [
  {
    chair: "CHAIR 01",
    name: "Melben Jay",
    role: "Master Barber",
    image: barber1,
  },
  {
    chair: "CHAIR 02",
    name: "Siegfred Opiana",
    role: "Senior Barber",
    image: barber2,
  },
  {
    chair: "CHAIR 03",
    name: "Mark Eito",
    role: "Barber",
    image: barber3,
  },
];

function BarberCard({ chair, name, role, image }) {
  return (
    <article className="group relative flex flex-col border border-fadezone-accent/40 bg-fadezone-surface/90 text-fadezone-text transition-colors hover:border-fadezone-accent">
      {/* Top Vintage Roster Header */}
      <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-3 py-2 sm:px-4">
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent sm:text-[11px]">
          {chair}
        </span>
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/70 sm:text-[11px]">
          {role}
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
          <span>Book Barber</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}

export default function BarbersSection() {
  return (
    <section
      id="barbers"
      className="scroll-mt-20 border-t border-fadezone-accent/30 bg-fadezone-background py-16 text-fadezone-text sm:py-20 lg:scroll-mt-10 lg:py-28"
    >
      <Container>
        {/* Editorial Vintage Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                The Crew • Subic, Zambales
              </p>
            </div>

            <h2 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              Meet The <span className="text-fadezone-accent">Barbers.</span>
            </h2>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            The hands behind every cut. Pick your preferred barber and lock in
            your next fade.
          </p>
        </div>

        {/* 3-Column Barber Roster Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BARBERS.map((b) => (
            <BarberCard key={b.name} {...b} />
          ))}
        </div>

        {/* Vintage Ticket Footer */}
        <div className="mt-12 border-t border-dashed border-fadezone-text/25 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <p className="font-heading text-base tracking-[0.2em] text-fadezone-accent sm:text-lg">
              PRECISION CUTS • DAILY 10 AM – 10 PM
            </p>

            <a
              href="/booking"
              className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:w-auto"
            >
              <span>Book Your Session</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
