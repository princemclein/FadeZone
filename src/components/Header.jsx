export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <p className="bg-fadezone-black px-4 py-2 text-center text-xs font-semibold tracking-[0.18em] text-fadezone-light">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-fadezone-silver align-middle" />
        NOW ACCEPTING BOOKINGS — SECURE YOUR NEXT CUT TODAY.
      </p>

      <div className="border-b border-fadezone-black/10 bg-fadezone-light/95 px-12 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6">
          <a href="/" aria-label="FadeZone home" className="shrink-0">
            <p className="font-heading text-3xl tracking-wide text-fadezone-black">
              FadeZone
            </p>
          </a>

          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-8">
              <li>
                <a
                  href="#home"
                  className="text-s font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-s font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-s font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#barbers"
                  className="text-s font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                >
                  Barbers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-s font-semibold uppercase tracking-[0.16em] text-fadezone-black transition-colors hover:text-fadezone-silver"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <a
            href="/booking"
            className="bg-fadezone-black px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-light transition-transform hover:-translate-y-0.5 hover:bg-fadezone-charcoal"
          >
            Book Now
          </a>
        </div>
      </div>
    </header>
  );
}
