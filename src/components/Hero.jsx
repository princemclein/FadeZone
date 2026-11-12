import Container from "./Container";
import Haircut1 from "../assets/home-images/haircut1.jpeg";
import Haircut2 from "../assets/home-images/haircut2.jpeg";
import Haircut3 from "../assets/home-images/haircut3.jpg";
import Haircut4 from "../assets/home-images/haircut4.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-27 bg-fadezone-background py-12 md:py-4"
    >
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-heading text-5xl uppercase leading-none text-fadezone-text sm:text-6xl lg:text-6xl xl:text-7xl">
            <span className="block whitespace-nowrap">Stay Sharp.</span>
            <span className="block whitespace-nowrap">Stay Fresh.</span>
            <span className="block whitespace-nowrap">Stay FadeZone.</span>
          </h1>

          <p className="max-w-md text-base font-body text-fadezone-text/70">
            Experience precision cuts tailored to your style. Every detail
            matters in giving you a clean, confident look. Stay sharp, stay
            fresh, stay FadeZone.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/booking"
              className="bg-fadezone-surface px-6 py-4 text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-text transition-transform hover:bg-fadezone-accent"
            >
              Meet Our Barbers
            </a>
            <a
              href="#services"
              className="border border-fadezone-text px-6 py-4 text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-text transition-transform hover:bg-fadezone-surface hover:text-fadezone-text"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Right: staggered collage */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3 justify-self-center md:justify-self-end">
          <div className="flex flex-col gap-3">
            <img
              src={Haircut1}
              alt="Fresh FadeZone haircut"
              className="aspect-4/5 w-full object-cover"
            />
            <img
              src={Haircut2}
              alt="Barber styling a haircut"
              className="aspect-4/5 w-full object-cover"
            />
          </div>
          <div className="mt-10 flex flex-col gap-3">
            <img
              src={Haircut3}
              alt="Detailed barber haircut"
              className="aspect-4/5 w-full object-cover"
            />
            <img
              src={Haircut4}
              alt="Finished FadeZone haircut"
              className="aspect-3/4 w-full object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
