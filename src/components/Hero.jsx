export default function Hero() {
  return (
    <section id="home" className="bg-fadezone-light py-12 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-12">
        {/* Left */}
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-5xl uppercase leading-none text-fadezone-black sm:text-6xl lg:text-7xl">
            <span className="block">Stay Sharp.</span>
            <span className="block">Stay Fresh.</span>
            <span className="block">Stay FadeZone.</span>
          </h1>

          <p className="max-w-md text-base text-fadezone-black/70">
            Experience precision cuts and expert grooming tailored to your
            style. Look sharp, feel fresh, and leave with confidence.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/booking"
              className="bg-fadezone-black px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-light transition-transform hover:-translate-y-0.5 hover:bg-fadezone-charcoal"
            >
              Book Your Appointment
            </a>
            <a
              href="#services"
              className="border border-fadezone-black px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-black transition-transform hover:-translate-y-0.5"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Right: staggered collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="aspect-3/4 w-full bg-gray-300" />
            <div className="aspect-3/4 w-full bg-gray-300" />
          </div>
          <div className="mt-12 flex flex-col gap-4 lg:mt-16">
            <div className="aspect-3/4 w-full bg-gray-300" />
            <div className="aspect-4/5 w-full bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
