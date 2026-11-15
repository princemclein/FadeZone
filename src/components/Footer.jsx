import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Container from "./Container";

const OPEN_HOUR = 10; // 10 AM
const CLOSE_HOUR = 22; // 10 PM
const TIMEZONE = "Asia/Manila"; // status follows the shop's time, not the visitor's
const PHONE_DISPLAY = "09461803476";
const PHONE_TEL = "+639461803476";
const ADDRESS =
  "14D Soriano Street, Wawandue, near Subic Park, Subic, Zambales 2209";
const MAPS_URL =
  "https://www.google.com/maps/place/Fadezone/@14.8781131,120.2223896,15z/data=!4m15!1m8!3m7!1s0x339671f613c374e7:0xc32420218d8dd21b!2sFadezone!8m2!3d14.8781028!4d120.2326308!10e5!16s%2Fg%2F11zgpljwn4!3m5!1s0x339671f613c374e7:0xc32420218d8dd21b!8m2!3d14.8781028!4d120.2326308!16s%2Fg%2F11zgpljwn4";
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
    "transition-colors hover:text-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fadezone-text";

  return (
    <footer className="border-t border-fadezone-accent/30 bg-fadezone-background text-fadezone-text">
      {/* Vintage Barber Pole / Accent Strip */}
      <div
        aria-hidden="true"
        className="h-3 w-full border-b border-fadezone-accent/30 bg-[repeating-linear-gradient(135deg,var(--color-fadezone-accent)_0_12px,var(--color-fadezone-background)_12px_24px)]"
      />

      {/* Main Editorial Footer Split */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left: Brand Headline + CTA (7 cols) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                FadeZone Barbershop • Est. 2026
              </p>
            </div>

            <p className="font-heading text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
              Stay Sharp.{" "}
              <span className="block text-fadezone-accent">Book Your Cut.</span>
            </p>

            <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 sm:text-base">
              Walk-ins welcome. Book ahead to lock in your chair and skip the
              wait.
            </p>

            <div className="pt-2">
              <a
                href="/booking"
                className="group inline-flex items-center gap-4 border border-fadezone-accent bg-fadezone-surface px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fadezone-text"
              >
                <span>Claim Your Chair</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right: Vintage "Next!" Ticket Stub Plate (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative border border-fadezone-accent/50 bg-fadezone-surface/90 p-6 sm:p-8">
              {/* Corner Viewfinder Brackets */}
              <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-fadezone-accent/70" />
              <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-fadezone-accent/70" />
              <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-fadezone-accent/70" />
              <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-fadezone-accent/70" />

              {/* Ticket Header */}
              <div className="flex items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="font-heading text-3xl uppercase tracking-wide text-fadezone-text">
                  Next!
                </span>
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  TICKET NO. 150
                </span>
              </div>

              {/* Live Shop Status */}
              <div
                role="status"
                className="my-4 flex items-center justify-between gap-3 border border-fadezone-text/15 bg-fadezone-background/60 px-4 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 ${
                      isOpen ? "animate-pulse bg-[#2EFF2E]" : "bg-[#FF2E2E]"
                    }`}
                  />
                  <span>
                    {isOpen
                      ? "Open Now · Closes 10 PM"
                      : "Closed · Opens 10 AM"}
                  </span>
                </div>
              </div>

              <div className="my-4 border-t border-dashed border-fadezone-text/25" />

              {/* Hours & Rate */}
              <div className="space-y-2 font-body text-xs uppercase tracking-[0.2em]">
                <div className="flex justify-between text-fadezone-text/70">
                  <span>Mon – Sun</span>
                  <span className="font-bold text-fadezone-text">
                    10 AM – 10 PM
                  </span>
                </div>
                <div className="flex justify-between text-fadezone-text/70">
                  <span>Standard Cut</span>
                  <span className="font-bold text-fadezone-accent">₱150</span>
                </div>
              </div>

              <div className="my-4 border-t border-dashed border-fadezone-text/25" />

              {/* Address + Contact */}
              <address className="font-body text-xs leading-6 not-italic text-fadezone-text/75 sm:text-sm">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block ${linkClass}`}
                >
                  {ADDRESS}
                </a>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className={`mt-2 inline-block font-heading text-lg tracking-wider text-fadezone-text ${linkClass}`}
                >
                  {PHONE_DISPLAY}
                </a>
              </address>

              {/* Social Links */}
              <div className="mt-5 flex items-center gap-6 border-t border-dashed border-fadezone-text/25 pt-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Facebook ↗
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation & Developer Directory Row */}
        <div className="mt-14 grid gap-8 border-t border-dashed border-fadezone-text/25 pt-10 sm:grid-cols-2">
          <nav aria-label="Footer">
            <h2 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
              01 / Explore
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-fadezone-text/75">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:text-right">
            <h2 className="mb-3 font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
              02 / Developed By
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-body text-sm text-fadezone-text/75 sm:justify-end">
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
                    className="ml-2 text-fadezone-accent"
                    style={{ transform: "rotate(60deg)" }}
                    aria-hidden="true"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Stamp Line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-fadezone-text/15 pt-6 text-center font-body text-[11px] uppercase tracking-[0.25em] text-fadezone-text/50 sm:flex-row sm:text-left">
          <span>© 2026 FadeZone Barbershop • All Rights Reserved</span>
          <span className="text-fadezone-accent/80">Subic, Zambales 2209</span>
        </div>
      </Container>
    </footer>
  );
}
