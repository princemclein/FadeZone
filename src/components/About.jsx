import Container from "./Container";
import AboutImg from "../assets/about-images/about-img.png";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-fadezone-background py-16 text-fadezone-text sm:py-20 lg:scroll-mt-10 lg:py-28"
    >
      <Container className="flex flex-col gap-12 lg:gap-16">
        {/* Top Editorial Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Who We Are
              </p>
            </div>

            <h2 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              More Than Just{" "}
              <span className="text-fadezone-accent">A Haircut.</span>
            </h2>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/70 lg:text-right">
            Subic’s neighborhood chair for sharp fades, classic tapers, and
            everyday confidence.
          </p>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: Framed Shop Photo (5 cols) */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            {/* Offset hairline accent frame */}
            <div className="pointer-events-none absolute -inset-2.5 hidden border border-fadezone-accent/35 sm:block lg:-inset-3" />

            <div className="group relative overflow-hidden border border-fadezone-text/15 bg-fadezone-surface">
              <img
                src={AboutImg}
                alt="FadeZone Interior"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Bottom corner stamp */}
              <div className="flex items-center justify-between border-t border-fadezone-text/15 bg-fadezone-surface/95 px-5 py-3">
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  The Barber Shop
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-fadezone-text/60">
                  Est. June 12, 2026
                </span>
              </div>
            </div>
          </div>

          {/* Right: Story & Pillars (7 cols) */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <h3 className="font-heading text-3xl uppercase leading-[0.98] text-fadezone-text sm:text-4xl lg:text-5xl">
                Built on style.{" "}
                <span className="block text-fadezone-accent sm:inline">
                  Defined by precision.
                </span>
              </h3>

              <div className="mt-6 space-y-4 font-body text-sm leading-7 text-fadezone-text/80 sm:text-base sm:leading-8">
                <p>
                  Founded on June 12, 2026, FadeZone was established with a
                  passion for barbering and personal style. What started as a
                  vision to provide quality haircuts became a place where
                  customers can express themselves through their look.
                </p>
                <p>
                  At FadeZone, every cut is an opportunity to bring out
                  confidence, individuality, and style.
                </p>
              </div>
            </div>

            {/* Bottom Craft Pillars */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-dashed border-fadezone-text/25 pt-7 sm:grid-cols-2">
              <div className="border border-fadezone-text/15 bg-fadezone-surface/35 p-5">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  01 / The Standard
                </p>
                <p className="mt-2 font-heading text-xl uppercase tracking-wide text-fadezone-text">
                  Tailored Precision
                </p>
                <p className="mt-1 font-body text-xs leading-6 text-fadezone-text/65">
                  Every fade and line-up is shaped around your head structure
                  and personal style.
                </p>
              </div>

              <div className="border border-fadezone-text/15 bg-fadezone-surface/35 p-5">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  02 / The Vibe
                </p>
                <p className="mt-2 font-heading text-xl uppercase tracking-wide text-fadezone-text">
                  Relaxed & Welcoming
                </p>
                <p className="mt-1 font-body text-xs leading-6 text-fadezone-text/65">
                  A clean, laid-back space in Subic where regulars and
                  first-time walk-ins feel right at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
