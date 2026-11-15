import Container from "./Container";
import Haircut1 from "../assets/home-images/haircut1.jpeg";
import Haircut2 from "../assets/home-images/haircut2.jpeg";
import Haircut3 from "../assets/home-images/haircut3.jpg";
import Haircut4 from "../assets/home-images/haircut4.jpg";
import Background from "../assets/background.png";

export default function Hero() {
  return (
    <section
      id="home"
      style={{ backgroundImage: `url(${Background})` }}
      className="relative scroll-mt-27 flex min-h-0 items-center overflow-hidden bg-cover bg-center bg-no-repeat py-12 sm:py-16 lg:min-h-168 lg:py-24"
    >
      {/* Responsive overlay: vertical fade on mobile/tablet, horizontal fade on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fadezone-background/95 via-fadezone-background/85 to-fadezone-background/75 lg:bg-gradient-to-r lg:from-fadezone-background/95 lg:via-fadezone-background/80 lg:to-fadezone-background/55" />

      <Container className="relative z-10 grid w-full grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left: Editorial Copy & Actions (6 cols) */}
        <div className="flex w-full flex-col gap-5 sm:gap-7 lg:col-span-6">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 bg-fadezone-accent sm:w-8" />
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.22em] text-fadezone-accent sm:text-xs sm:tracking-[0.3em]">
              Subic, Zambales • Est. FadeZone
            </p>
          </div>

          {/* Stacked Display Headline */}
          <h1 className="font-heading text-[clamp(2.5rem,11vw,4.75rem)] uppercase leading-[0.95] text-fadezone-text sm:text-[clamp(3.25rem,7vw,4.75rem)]">
            <span className="block whitespace-nowrap">Stay Sharp.</span>
            <span className="block whitespace-nowrap">Stay Fresh.</span>
            <span className="block whitespace-nowrap text-fadezone-accent">
              Stay Fade
            </span>
            <span className="block whitespace-nowrap text-fadezone-accent">
              Zone.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-xl font-body text-sm leading-6 text-fadezone-text/75 sm:text-base sm:leading-7 lg:max-w-lg">
            Experience precision cuts tailored to your style. Every detail
            matters in giving you a clean, confident look—walk in or book your
            chair today.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex w-full flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="/booking"
              className="group flex w-full items-center justify-center gap-3 bg-fadezone-accent px-6 py-3.5 text-xs font-body font-bold uppercase tracking-[0.18em] text-fadezone-text transition-colors hover:bg-fadezone-surface hover:ring-1 hover:ring-fadezone-accent sm:w-auto sm:px-7 sm:py-4 sm:tracking-[0.2em]"
            >
              <span>Book Appointment</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#barbers"
              className="w-full border border-fadezone-text/30 bg-fadezone-surface/40 px-6 py-3.5 text-center text-xs font-body font-bold uppercase tracking-[0.18em] text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent sm:w-auto sm:px-7 sm:py-4 sm:tracking-[0.2em]"
            >
              Meet Our Barbers
            </a>
          </div>
        </div>

        {/* Right: Framed Staggered Collage (6 cols) */}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-lg lg:col-span-6 lg:max-w-lg lg:justify-self-end">
          {/* Decorative corner frame accent */}
          <div className="pointer-events-none absolute -inset-2.5 hidden border border-fadezone-accent/30 sm:block lg:-inset-3" />

          <div className="relative grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {/* Left Column */}
            <div className="flex flex-col gap-2.5 sm:gap-3.5">
              <div className="group relative overflow-hidden border border-fadezone-text/15 bg-fadezone-surface">
                <img
                  src={Haircut1}
                  alt="Fresh FadeZone haircut"
                  className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="group relative overflow-hidden border border-fadezone-text/15 bg-fadezone-surface">
                <img
                  src={Haircut2}
                  alt="Barber styling a haircut"
                  className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Staggered Column */}
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-10 sm:gap-3.5 lg:mt-12">
              <div className="group relative overflow-hidden border border-fadezone-text/15 bg-fadezone-surface">
                <img
                  src={Haircut3}
                  alt="Detailed barber haircut"
                  className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="group relative overflow-hidden border border-fadezone-text/15 bg-fadezone-surface">
                <img
                  src={Haircut4}
                  alt="Finished FadeZone haircut"
                  className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
