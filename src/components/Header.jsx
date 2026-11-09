import { useEffect, useState } from "react";
import Container from "./Container";

const links = ["home", "about", "services", "barbers", "contact"];

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
      <p className="flex items-center justify-center bg-fadezone-black px-4 py-2 text-center text-xs font-semibold tracking-[0.18em] text-fadezone-light">
        NOW ACCEPTING BOOKINGS — SECURE YOUR NEXT CUT TODAY.
      </p>

      <div className="relative overflow-x-clip border-b border-fadezone-black/10 bg-fadezone-light/95 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between gap-6">
          <a href="/" aria-label="FadeZone home" className="shrink-0">
            <p className="font-heading text-3xl tracking-wide text-fadezone-black">
              FadeZone.
            </p>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center text-3xl leading-none text-fadezone-black lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-sm font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="/booking"
            className="hidden lg:block bg-fadezone-black px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-light transition-transform hover:-translate-y-0.5 hover:bg-fadezone-charcoal"
          >
            Book Now
          </a>
        </Container>

        <nav
          className={`absolute right-0 top-full z-50 h-[calc(100dvh-100%-2rem)] w-[60vw] max-w-xs overflow-y-auto border-l border-fadezone-black/10 bg-fadezone-light text-fadezone-black shadow-[-10px_0_14px_-12px_rgba(16,16,16,0.16)] transition-transform duration-300 ease-out lg:hidden ${
            isMenuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
          aria-label="Responsive navigation"
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col">
            {links.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-5 text-center text-sm font-semibold uppercase tracking-[0.16em]"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="p-6">
              <a
                href="/booking"
                className="block bg-fadezone-black px-6 py-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-fadezone-light transition-transform hover:-translate-y-0.5"
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
