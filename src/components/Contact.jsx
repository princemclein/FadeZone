import Container from "./Container";

const CONTACT = {
  phone: "0946803476",
  tel: "+639461803476",
  address:
    "14D Soriano Street, Wawandue, near Subic Park, Subic, Zambales 2209",
  maps: "https://www.google.com/maps/place/Fadezone/@14.8781131,120.2223896,15z/data=!4m15!1m8!3m7!1s0x339671f613c374e7:0xc32420218d8dd21b!2sFadezone!8m2!3d14.8781028!4d120.2326308!10e5!16s%2Fg%2F11zgpljwn4!3m5!1s0x339671f613c374e7:0xc32420218d8dd21b!8m2!3d14.8781028!4d120.2326308!16s%2Fg%2F11zgpljwn4",
  facebook: "https://www.facebook.com/profile.php?id=61590669484136",
  instagram: "https://www.instagram.com/fadezone.m/?hl=en",
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-27 bg-fadezone-background py-20 text-fadezone-text md:py-28"
    >
      <Container>
        {/* Top Header Split */}
        <div className="mb-14 flex flex-col justify-between gap-8 border-b border-fadezone-text/15 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Get in Touch
              </p>
            </div>

            <h2 className="font-heading text-5xl uppercase leading-[0.95] sm:text-6xl md:text-7xl">
              Your Next Cut{" "}
              <span className="text-fadezone-accent">Starts Here.</span>
            </h2>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="text-sm leading-7 text-fadezone-text/70 md:text-base">
              Have questions or planning your next visit? Reach out to FadeZone
              or drop by our shop. Walk-ins are always welcome.
            </p>
          </div>
        </div>

        {/* Main Bento / Editorial Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left Column: Primary Booking & Hours Card (5 cols) */}
          <div className="flex flex-col justify-between border border-fadezone-accent/40 bg-fadezone-surface/40 p-8 sm:p-10 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  The Shop
                </span>
                <span className="inline-flex items-center gap-2 border border-fadezone-accent/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-fadezone-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-fadezone-accent" />
                  Open Daily
                </span>
              </div>

              <h3 className="mt-6 font-heading text-4xl uppercase">
                FadeZone.
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-fadezone-text/60">
                Stay Sharp. Stay Fresh.
              </p>

              {/* Hours Block */}
              <div className="mt-8 border-y border-dashed border-fadezone-text/25 py-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                  Shop Hours
                </p>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-fadezone-text/80">
                    Monday – Sunday
                  </span>
                  <span className="font-heading text-2xl tracking-wide text-fadezone-text">
                    10 AM – 10 PM
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Area */}
            <div className="mt-10">
              <p className="mb-5 text-sm leading-6 text-fadezone-text/70">
                Drop by the chair or book ahead to lock in your preferred slot.
              </p>
              <a
                href="/booking"
                className="group flex w-full items-center justify-between bg-fadezone-accent px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-all hover:bg-fadezone-surface hover:ring-1 hover:ring-fadezone-accent"
              >
                <span>Book Your Appointment</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details Grid (7 cols) */}
          <div className="flex flex-col justify-between border border-fadezone-text/15 bg-fadezone-background p-8 sm:p-10 lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Location */}
              <div className="sm:col-span-2">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                  01 / Location
                </p>
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-fadezone-text/15 bg-fadezone-surface/20 p-5 transition-colors hover:border-fadezone-accent/60"
                >
                  <p className="text-base leading-7 text-fadezone-text/90 transition-colors group-hover:text-fadezone-accent">
                    {CONTACT.address}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                    Open in Google Maps
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </a>
              </div>

              {/* Phone */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                  02 / Direct Line
                </p>
                <a
                  href={`tel:${CONTACT.tel}`}
                  className="group block border border-fadezone-text/15 bg-fadezone-surface/20 p-5 transition-colors hover:border-fadezone-accent/60"
                >
                  <p className="font-heading text-2xl tracking-wider text-fadezone-text transition-colors group-hover:text-fadezone-accent">
                    {CONTACT.phone}
                  </p>
                  <span className="mt-2 block text-xs uppercase tracking-widest text-fadezone-text/50">
                    Tap to Call
                  </span>
                </a>
              </div>

              {/* Socials */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                  03 / Socials
                </p>
                <div className="flex h-[calc(100%-28px)] flex-col justify-center gap-3 border border-fadezone-text/15 bg-fadezone-surface/20 p-5">
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm font-medium text-fadezone-text/85 transition-colors hover:text-fadezone-accent"
                  >
                    <span>Facebook</span>
                    <span>↗</span>
                  </a>
                  <div className="border-t border-fadezone-text/10" />
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm font-medium text-fadezone-text/85 transition-colors hover:text-fadezone-accent"
                  >
                    <span>Instagram</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Ticket Stamp Footer */}
            <div className="mt-10 border-t border-dashed border-fadezone-text/25 pt-6">
              <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                <p className="font-heading text-lg tracking-[0.2em] text-fadezone-accent">
                  STAY SHARP • STAY FRESH • STAY FADEZONE
                </p>
                <span className="text-[11px] uppercase tracking-[0.25em] text-fadezone-text/40">
                  Subic, Zambales
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
