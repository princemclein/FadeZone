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
      className="scroll-mt-27 bg-cover bg-center bg-no-repeat py-12 md:py-4"
    >
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* Left */}
        <div className="flex w-full max-w-115 flex-col gap-6">
          <h1 className="font-heading text-[clamp(2.75rem,11vw,4rem)] uppercase leading-none text-fadezone-text">
            <span className="block whitespace-nowrap">Stay Sharp.</span>
            <span className="block whitespace-nowrap">Stay Fresh.</span>
            <span className="block whitespace-nowrap">Stay FadeZone.</span>
          </h1>

          <p className="w-full text-base font-body text-fadezone-text/70 text-justify">
            Experience precision cuts tailored to your style. Every detail
            matters in giving you a clean, confident look. Stay sharp, stay
            fresh, stay FadeZone.
          </p>

          <div className="flex w-full flex-wrap gap-4">
            <a
              href="/booking"
              className="w-full bg-fadezone-surface px-6 py-4 text-center text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-text transition-transform hover:bg-fadezone-accent sm:w-auto"
            >
              Meet Our Barbers
            </a>
            <a
              href="#services"
              className="w-full border border-fadezone-text px-6 py-4 text-center text-xs font-body font-bold uppercase tracking-[0.14em] text-fadezone-text transition-transform hover:bg-fadezone-surface hover:text-fadezone-text sm:w-auto"
            >
              Explore Our Services
            </a>
          </div>
        </div>
        {/* Right: staggered collage */}
        <div className="grid w-full max-w-md grid-cols-2 gap-3 justify-self-center md:max-w-xs md:justify-self-end xl:max-w-md">
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
