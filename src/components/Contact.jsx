import Container from "./Container";

const CONTACT = {
  phone: "09461803476",
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
      className="scroll-mt-20 border-t border-fadezone-accent/30 bg-fadezone-texture py-16 text-fadezone-text sm:py-20 lg:scroll-mt-10 lg:py-28"
    >
      <Container>
        {/* Editorial Vintage Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 sm:mb-14 sm:pb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Shop Dispatch • Subic, Zambales
              </p>
            </div>

            <h2 className="font-heading text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl">
              Your Next Cut{" "}
              <span className="text-fadezone-accent">Starts Here.</span>
            </h2>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="font-body text-sm leading-7 text-fadezone-text/75 md:text-base">
              Have questions or planning your next visit? Reach out to FadeZone
              or drop by our shop. Walk-ins are always welcome.
            </p>
          </div>
        </div>

        {/* Main Vintage Bento / Ticket Grid */}
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-12">
          {/* Left Column: Vintage Shop Pass Card (5 cols) */}
          <div className="relative flex flex-col justify-between border border-fadezone-accent/50 bg-fadezone-surface/90 p-6 sm:p-8 lg:col-span-5 lg:p-10">
            {/* Corner Viewfinder Brackets */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-fadezone-accent/70" />
            <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-fadezone-accent/70" />
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-fadezone-accent/70" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-fadezone-accent/70" />

            <div>
              {/* Top Ticket Stub Header */}
              <div className="flex items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  SHOP PASS • EST. 2026
                </span>
                <span className="inline-flex items-center gap-2 border border-fadezone-accent/50 bg-fadezone-background/60 px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-fadezone-accent">
                  <span className="h-1.5 w-1.5 bg-fadezone-accent" />
                  Open Daily
                </span>
              </div>

              <h3 className="mt-6 font-heading text-3xl uppercase tracking-wide sm:text-4xl">
                FadeZone.
              </h3>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.25em] text-fadezone-text/60">
                Stay Sharp • Stay Fresh
              </p>

              {/* Hours Block */}
              <div className="mt-7 border-y border-dashed border-fadezone-text/25 py-5 sm:mt-8 sm:py-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                    Shop Hours
                  </p>
                  <span className="font-body text-[11px] font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                    Flat Rate ₱150
                  </span>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-body text-sm text-fadezone-text/80">
                    Monday – Sunday
                  </span>
                  <span className="font-heading text-xl tracking-wide text-fadezone-text sm:text-2xl">
                    10 AM – 10 PM
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Area */}
            <div className="mt-8 sm:mt-10">
              <p className="mb-5 font-body text-sm leading-6 text-fadezone-text/75">
                Drop by the shop or book ahead to lock in your preferred slot.
              </p>
              <a
                href="/booking"
                className="group flex w-full items-center justify-between border border-fadezone-accent bg-fadezone-accent px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
              >
                <span>Book Your Appointment</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Vintage Directory Plates (7 cols) */}
          <div className="relative flex flex-col justify-between border border-fadezone-accent/40 bg-fadezone-surface/90 p-6 sm:p-8 lg:col-span-7 lg:p-10">
            {/* Corner Viewfinder Brackets */}
            <span className="pointer-events-none absolute top-2.5 left-2.5 h-3 w-3 border-t border-l border-fadezone-accent/70" />
            <span className="pointer-events-none absolute top-2.5 right-2.5 h-3 w-3 border-t border-r border-fadezone-accent/70" />
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 h-3 w-3 border-b border-l border-fadezone-accent/70" />
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 h-3 w-3 border-b border-r border-fadezone-accent/70" />

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {/* Location Plate */}
              <div className="sm:col-span-2">
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-fadezone-text/20 bg-fadezone-background/70 transition-colors hover:border-fadezone-accent"
                >
                  <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-5 py-2.5">
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                      01 / Location
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                      Zambales 2209
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="font-body text-sm leading-7 text-fadezone-text/90 transition-colors group-hover:text-fadezone-accent sm:text-base">
                      {CONTACT.address}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                      Open in Google Maps
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </span>
                  </div>
                </a>
              </div>

              {/* Direct Line Plate */}
              <div>
                <a
                  href={`tel:${CONTACT.tel}`}
                  className="group flex h-full flex-col justify-between border border-fadezone-text/20 bg-fadezone-background/70 transition-colors hover:border-fadezone-accent"
                >
                  <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-5 py-2.5">
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                      02 / Direct Line
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                      SMS / Call
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="font-heading text-xl tracking-wider text-fadezone-text transition-colors group-hover:text-fadezone-accent sm:text-2xl">
                      {CONTACT.phone}
                    </p>
                    <span className="mt-2 block font-body text-xs uppercase tracking-widest text-fadezone-text/55">
                      Tap to Call
                    </span>
                  </div>
                </a>
              </div>

              {/* Socials Plate */}
              <div>
                <div className="flex h-full flex-col justify-between border border-fadezone-text/20 bg-fadezone-background/70">
                  <div className="flex items-center justify-between border-b border-dashed border-fadezone-text/25 px-5 py-2.5">
                    <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                      03 / Socials
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-text/60">
                      @fadezone.m
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-center gap-3 p-5">
                    <a
                      href={CONTACT.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-body text-sm font-medium text-fadezone-text/85 transition-colors hover:text-fadezone-accent"
                    >
                      <span>Facebook</span>
                      <span>↗</span>
                    </a>
                    <div className="border-t border-dashed border-fadezone-text/20" />
                    <a
                      href={CONTACT.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between font-body text-sm font-medium text-fadezone-text/85 transition-colors hover:text-fadezone-accent"
                    >
                      <span>Instagram</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Stamp Footer */}
            <div className="mt-8 border-t border-dashed border-fadezone-text/25 pt-6 sm:mt-10">
              <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                <p className="font-heading text-base tracking-[0.2em] text-fadezone-accent sm:text-lg">
                  STAY SHARP • STAY FRESH • STAY FADEZONE
                </p>
                <span className="font-body text-[11px] uppercase tracking-[0.25em] text-fadezone-text/50">
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
