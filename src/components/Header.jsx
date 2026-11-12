import { useEffect, useState } from "react";
import Container from "./Container";

const links = ["home", "about", "Gallery", "barbers", "contact"];

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
      <p className="flex items-center justify-center bg-fadezone-accent px-4 py-2 text-center text-xs font-body font-semibold tracking-[0.18em] text-fadezone-text">
        NOW ACCEPTING BOOKINGS — SECURE YOUR NEXT CUT TODAY.
      </p>

      <div className="relative overflow-x-clip bg-fadezone-surface/95 shadow-sm backdrop-blur-md">
        <Container className="flex h-19 items-center justify-between gap-6">
          <a href="/" aria-label="FadeZone home" className="shrink-0">
            <p className="font-heading text-3xl tracking-wide text-fadezone-text">
              FadeZone.
            </p>
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-11 w-11 items-center justify-center text-3xl leading-none text-fadezone-text min-[900px]:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <nav
            className="hidden min-[900px]:block"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-8">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={item === "home" ? "/" : `#${item.toLowerCase()}`}
                    className="relative inline-block pb-1 text-sm font-body font-semibold uppercase tracking-[0.16em] text-fadezone-text after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-fadezone-text after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="/booking"
            className="hidden min-[900px]:block bg-fadezone-text px-6 py-3 text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-background transition-transform hover:bg-fadezone-accent"
          >
            Book Now
          </a>
        </Container>

        <nav
          className={`absolute right-0 top-full z-50 h-[calc(100dvh-100%-2rem)] w-[60vw] max-w-xs overflow-y-auto border-l border-fadezone-text/10 bg-fadezone-surface text-fadezone-text shadow-[-10px_0_14px_-12px_var(--color-fadezone-background)] transition-transform duration-300 ease-out min-[900px]:hidden ${
            isMenuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
          aria-label="Responsive navigation"
          aria-hidden={!isMenuOpen}
        >
          <ul className="flex flex-col">
            {links.map((item) => (
              <li key={item}>
                <a
                  href={item === "home" ? "/" : `#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative block py-5 text-center text-sm font-semibold uppercase tracking-[0.16em] after:absolute after:bottom-3 after:left-1/4 after:h-px after:w-1/2 after:origin-center after:scale-x-0 after:bg-fadezone-text after:content-[''] after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="p-6">
              <a
                href="/booking"
                className="block bg-fadezone-text px-6 py-4 text-center text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-background transition-transform hover:bg-fadezone-accent"
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
