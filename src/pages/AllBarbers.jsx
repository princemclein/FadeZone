import { useState } from "react";
import { Link } from "react-router-dom";
import barber1 from "../assets/barbers-section-images/MelbenJay.jpg";
import barber2 from "../assets/barbers-section-images/SiegfredOpiana.jpg";
import barber3 from "../assets/barbers-section-images/MarkEito.jpg";
import Container from "../components/Container";

const ALL_BARBERS = [
  {
    chair: "CHAIR 01",
    name: "Melben Jay",
    role: "Master Barber",
    specialty: "Skin Fades & Razor Line-Ups",
    experience: "8+ Years Behind The Chair",
    schedule: "Daily • 10 AM – 10 PM",
    bio: "Founder and lead blade specialist known for razor-sharp skin fades, clean beard sculpting, and classic scissor finishes.",
    image: barber1,
  },
  {
    chair: "CHAIR 02",
    name: "Siegfred Opiana",
    role: "Senior Barber",
    specialty: "Mid Fades & Textured Crops",
    experience: "5+ Years Behind The Chair",
    schedule: "Daily • 10 AM – 10 PM",
    bio: "Precision blend specialist focusing on balanced mid fades, textured tops, and effortless everyday styles.",
    image: barber2,
  },
  {
    chair: "CHAIR 03",
    name: "Mark Eito",
    role: "Barber",
    specialty: "Taper Fades & Classic Cuts",
    experience: "3+ Years Behind The Chair",
    schedule: "Daily • 10 AM – 10 PM",
    bio: "Detail-driven barber specializing in clean tapers, uniform buzz cuts, and sharp temple and neck outlines.",
    image: barber3,
  },
];

const ROLES = ["All", "Master Barber", "Senior Barber", "Barber"];

function BarberRosterCard({ barber, onPreview }) {
  return (
    <article className="group relative flex flex-col border border-fadezone-accent/40 bg-fadezone-surface/90 text-fadezone-text transition-colors hover:border-fadezone-accent">
      {/* Top Vintage Roster Header */}
      <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-3 py-2 sm:px-4">
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent sm:text-[11px]">
          {barber.chair}
        </span>
        <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/70 sm:text-[11px]">
          ₱150
        </span>
      </div>

      {/* Framed Portrait with Inner Matting */}
      <div className="p-2.5 pb-0 sm:p-3.5 sm:pb-0">
        <button
          type="button"
          onClick={() => onPreview(barber)}
          aria-label={`Inspect ${barber.name}`}
          className="relative block aspect-4/5 w-full overflow-hidden border border-fadezone-text/15 bg-fadezone-background text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-accent"
        >
          <img
            src={barber.image}
            alt={barber.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Subtle vintage corner brackets */}
          <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-fadezone-text/60" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-fadezone-text/60" />

          {/* Role Stamp Overlay */}
          <span className="pointer-events-none absolute bottom-2.5 left-2.5 border border-fadezone-accent/50 bg-fadezone-background/85 px-2 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
            {barber.role}
          </span>
        </button>
      </div>

      {/* Card Footer */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
        <div>
          <h2 className="font-heading text-xl uppercase leading-none tracking-wide text-fadezone-text sm:text-2xl">
            {barber.name}
          </h2>
          <p className="mt-1.5 font-body text-[11px] uppercase tracking-[0.18em] text-fadezone-text/60">
            {barber.specialty}
          </p>
          <div className="mt-2.5 border-t border-dashed border-fadezone-text/25" />
        </div>

        <Link
          to="/booking"
          className="group/btn flex items-center justify-between border border-fadezone-accent/60 bg-fadezone-background/60 px-3 py-2.5 font-body text-[11px] font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent hover:text-fadezone-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:px-4 sm:text-xs"
        >
          <span>Book Barber</span>
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function AllBarbers() {
  const [activeRole, setActiveRole] = useState("All");
  const [selectedBarber, setSelectedBarber] = useState(null);

  const filteredBarbers =
    activeRole === "All"
      ? ALL_BARBERS
      : ALL_BARBERS.filter((barber) => barber.role === activeRole);

  return (
    <main className="min-h-screen border-t border-fadezone-accent/30 bg-fadezone-texture py-14 text-fadezone-text sm:py-20 lg:py-24">
      <Container>
        {/* Top Breadcrumb / Back Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-5">
          <Link
            to="/#barbers"
            className="group inline-flex items-center gap-2.5 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text/80 transition-colors hover:text-fadezone-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Barbers</span>
          </Link>

          <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
            SHOP ROSTER • {filteredBarbers.length} BARBERS
          </span>
        </div>

        {/* Editorial Vintage Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                The FadeZone Crew • Subic, Zambales
              </p>
            </div>

            <h1 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              Meet All{" "}
              <span className="text-fadezone-accent">FadeZone Barbers.</span>
            </h1>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            Tap any barber card to check their specialty and chair info, or book
            directly for a flat ₱150 cut.
          </p>
        </div>

        {/* Vintage Role Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-6">
          <div
            role="tablist"
            aria-label="Filter barbers by rank"
            className="flex flex-wrap gap-2.5"
          >
            {ROLES.map((role) => {
              const isActive = activeRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveRole(role)}
                  className={`border px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                      : "border-fadezone-accent/40 bg-fadezone-surface/80 text-fadezone-text/80 hover:border-fadezone-accent hover:text-fadezone-text"
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          <span className="font-body text-[11px] uppercase tracking-[0.22em] text-fadezone-text/60">
            Subic, Zambales • Open 10 AM – 10 PM
          </span>
        </div>

        {/* Roster Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {filteredBarbers.map((barber) => (
            <BarberRosterCard
              key={barber.chair}
              barber={barber}
              onPreview={setSelectedBarber}
            />
          ))}
        </div>

        {/* Vintage Ticket Footer */}
        <div className="mt-14 border-t border-dashed border-fadezone-text/25 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div>
              <p className="font-heading text-lg tracking-[0.2em] text-fadezone-accent sm:text-xl">
                WALKING IN WITHOUT A PREFERENCE?
              </p>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-fadezone-text/70">
                Any open chair delivers the same ₱150 precision cut.
              </p>
            </div>

            <Link
              to="/booking"
              className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-surface px-7 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text sm:w-auto"
            >
              <span>Claim Any Chair</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>

      {/* Vintage Barber Profile Lightbox Modal */}
      {selectedBarber && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedBarber.name}
          onClick={() => setSelectedBarber(null)}
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
                {selectedBarber.chair} • {selectedBarber.role}
              </span>
              <button
                type="button"
                onClick={() => setSelectedBarber(null)}
                aria-label="Close profile"
                className="border border-fadezone-text/25 px-2.5 py-1 font-body text-xs font-bold uppercase tracking-widest text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Content Split */}
            <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
              <div className="aspect-4/5 overflow-hidden border border-fadezone-text/20 bg-fadezone-background">
                <img
                  src={selectedBarber.image}
                  alt={selectedBarber.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                    {selectedBarber.experience}
                  </span>
                  <h2 className="mt-2 font-heading text-3xl uppercase leading-none tracking-wide sm:text-4xl">
                    {selectedBarber.name}
                  </h2>

                  <div className="my-4 border-t border-dashed border-fadezone-text/25" />

                  <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                    Specialty: {selectedBarber.specialty}
                  </p>
                  <p className="mt-1.5 font-body text-xs uppercase tracking-[0.18em] text-fadezone-accent">
                    {selectedBarber.schedule}
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-fadezone-text/80">
                    {selectedBarber.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4">
                  <Link
                    to="/booking"
                    className="group flex w-full items-center justify-between border border-fadezone-accent bg-fadezone-accent px-5 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
                  >
                    <span>Book {selectedBarber.name}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
