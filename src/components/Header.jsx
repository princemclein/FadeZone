import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const links = ["home", "about", "gallery", "barbers", "contact"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const { body } = document;
    const scrollY = window.scrollY;
    const previousStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = previousStyles.overflow;
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.width = previousStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Top Announcement / Dispatch Strip */}
      <div className="border-b border-dashed border-fadezone-text/30 bg-fadezone-accent px-4 py-2 text-center font-body text-[11px] font-bold uppercase tracking-[0.22em] text-fadezone-text sm:text-xs">
        NOW ACCEPTING BOOKINGS • FLAT RATE ₱150 • WALK-INS WELCOME
      </div>

      {/* Main Navigation Bar */}
      <div className="relative border-b border-fadezone-accent/40 bg-fadezone-surface/95 backdrop-blur-md">
        <Container className="flex h-19 items-center justify-between gap-6">
          {/* Brand Wordmark */}
          <Link
            to="/"
            aria-label="FadeZone home"
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="font-heading text-3xl uppercase tracking-wide text-fadezone-text transition-colors group-hover:text-fadezone-accent">
              FadeZone.
            </span>
            <span className="hidden border-l border-dashed border-fadezone-text/25 pl-3 font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent sm:inline-block">
              Est. 2026
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center border border-fadezone-accent/50 bg-fadezone-background/60 text-2xl leading-none text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent min-[900px]:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Navigation */}
          <nav
            className="hidden min-[900px]:block"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-7">
              {links.map((item, idx) => (
                <li key={item}>
                  <Link
                    to={item === "home" ? "/" : `/#${item}`}
                    className="group relative inline-flex items-baseline gap-1.5 pb-1 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:text-fadezone-accent after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fadezone-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    <span className="text-[10px] text-fadezone-accent/80">
                      0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <Link
            to="/booking"
            className="group hidden items-center gap-3 border border-fadezone-accent bg-fadezone-accent px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent min-[900px]:inline-flex"
          >
            <span>Book Now</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Container>

        {/* Mobile Drawer Backdrop */}
        {isMenuOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 top-full z-40 h-dvh w-full bg-fadezone-background/70 backdrop-blur-xs min-[900px]:hidden"
          />
        )}

        {/* Mobile Vintage Ticket Drawer */}
        <nav
          className={`absolute right-0 top-full z-50 flex h-[calc(100dvh-100%-2rem)] w-[72vw] max-w-xs flex-col justify-between overflow-y-auto border-l border-fadezone-accent/50 bg-fadezone-surface text-fadezone-text transition-transform duration-300 ease-out min-[900px]:hidden ${
            isMenuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
          aria-label="Responsive navigation"
          aria-hidden={!isMenuOpen}
        >
          <div>
            {/* Drawer Stub Header */}
            <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-6 py-4">
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                Shop Directory
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-fadezone-text/50">
                Subic
              </span>
            </div>

            <ul className="flex flex-col divide-y divide-dashed divide-fadezone-text/20">
              {links.map((item, idx) => (
                <li key={item}>
                  <Link
                    to={item === "home" ? "/" : `/#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="group flex items-center justify-between px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background/50 hover:text-fadezone-accent"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[10px] text-fadezone-accent">
                        0{idx + 1}
                      </span>
                      <span>{item}</span>
                    </span>
                    <span className="text-fadezone-accent/70 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Drawer Footer & Booking CTA */}
          <div className="border-t border-dashed border-fadezone-text/25 p-6">
            <Link
              to="/booking"
              onClick={() => setIsMenuOpen(false)}
              className="group flex w-full items-center justify-between border border-fadezone-accent bg-fadezone-accent px-5 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
            >
              <span>Book Now</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <p className="mt-4 text-center font-body text-[10px] uppercase tracking-[0.22em] text-fadezone-text/50">
              Open Daily • 10 AM – 10 PM
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
