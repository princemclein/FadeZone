import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const OPEN_HOUR = 10; // 10 AM
const CLOSE_HOUR = 22; // 10 PM
const TIMEZONE = "Asia/Manila"; // status follows the shop's time, not the visitor's
const PHONE_DISPLAY = "0946803476";
const PHONE_TEL = "+639461803476";
const ADDRESS =
  "14D Soriano Street, Wawandue, near Subic Park, Subic, Zambales 2209";
const MAPS_URL =
  "https://www.google.com/maps/place/Fadezone/@14.8781131,120.2223896,15z/data=!4m15!1m8!3m7!1s0x339671f613c374e7:0xc32420218d8dd21b!2sFadezone!8m2!3d14.8781028!4d120.2326308!10e5!16s%2Fg%2F11zgpljwn4!3m5!1s0x339671f613c374e7:0xc32420218d8dd21b!8m2!3d14.8781028!4d120.2326308!16s%2Fg%2F11zgpljwn4?entry=ttu&g_ep=EgoyMDI2MTEwOC4wIKXMDSoASAFQAw%3D%3D" +
  encodeURIComponent(ADDRESS);
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61590669484136";
const INSTAGRAM_URL = "https://www.instagram.com/fadezone.m/?hl=en";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Barbers", href: "#barbers" },
  { label: "Contact", href: "#contact" },
];

function shopHour() {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: false,
    timeZone: TIMEZONE,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour").value);
  return h === 24 ? 0 : h;
}

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const h = shopHour();
      setIsOpen(h >= OPEN_HOUR && h < CLOSE_HOUR);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  const linkClass =
    "transition hover:text-fadezone-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fadezone-text";

  return (
    <footer className="bg-fadezone-background text-fadezone-text">
      {/* Barber pole strip */}
      <div
        aria-hidden="true"
        className="h-3 w-full bg-[repeating-linear-gradient(135deg,var(--color-fadezone-text)_0_12px,var(--color-fadezone-background)_12px_24px)]"
      />

      {/* Main block */}
      <div className="mx-auto grid max-w-304 gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
        {/* Left: headline + CTAs */}
        <div className="flex flex-col gap-8">
          {/* LOGO SLOT: drop your <img> here */}
          <p className="font-heading text-5xl leading-none tracking-wide md:text-7xl">
            Stay sharp.
            <br />
            Book your cut.
          </p>

          <p className="max-w-sm text-base text-fadezone-text/70">
            Walk-ins welcome. Book ahead to skip the wait.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="bg-fadezone-surface px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] text-fadezone-text transition hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fadezone-text"
            >
              Book now
            </a>
          </div>
        </div>

        {/* Right: ticket card */}
        <div className="border border-dashed border-white/50 p-6 md:ml-auto md:w-full md:max-w-md">
          <span className="font-heading text-3xl tracking-wide">Next!</span>

          <div className="my-4 border-t border-dashed border-white/50" />

          {/* Live status */}
          <div
            role="status"
            className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text"
          >
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${
                isOpen ? "animate-pulse bg-[#41f041]" : "bg-[#FF2E2E]"
              }`}
            />
            {isOpen ? "Open now · closes 10PM" : "Closed · opens 10AM"}
          </div>

          <div className="my-4 border-t border-dashed border-white/50" />

          {/* Hours */}
          <div className="flex justify-between text-sm text-fadezone-text/70">
            <span>Mon – Sun</span>
            <span className="text-fadezone-text">10AM – 8PM</span>
          </div>

          <div className="my-4 border-t border-dashed border-white/50" />

          {/* Address + contact */}
          <address className="text-sm not-italic text-fadezone-text/70">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`block underline-offset-4 hover:underline ${linkClass}`}
            >
              {ADDRESS}
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className={`mt-2 block text-fadezone-text underline-offset-4 hover:underline ${linkClass}`}
            >
              {PHONE_DISPLAY}
            </a>
          </address>

          <div className="mt-4 flex gap-5 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 ${linkClass}`}
            >
              Facebook
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 ${linkClass}`}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Link row */}
      <div className="mx-auto grid max-w-304 gap-8 border-t border-fadezone-text/15 px-6 py-10 sm:grid-cols-2">
        <nav aria-label="Footer">
          <h2 className="mb-3 font-heading text-xl tracking-wide">Explore</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fadezone-text/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 font-heading text-xl tracking-wide">Developer</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fadezone-text/70">
            <li>
              <a
                href="https://github.com/princemclein"
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                Prince Mclein J. Gonzales
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="ml-2"
                  style={{ transform: "rotate(60deg)" }}
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mx-auto flex max-w-304 flex-col items-center justify-center gap-3 border-t border-fadezone-text/15 px-6 py-5 text-xs uppercase tracking-[0.2em] text-fadezone-text/60 sm:flex-row">
        <span>© 2026 FadeZone</span>
      </div>
    </footer>
  );
}
