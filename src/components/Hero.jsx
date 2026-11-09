import Container from "./Container";
import Haircut1 from "../assets/home-images/haircut1.jpeg";
import Haircut2 from "../assets/home-images/haircut2.jpeg";
import Haircut3 from "../assets/home-images/haircut3.jpg";
import Haircut4 from "../assets/home-images/haircut4.jpg";

export default function Hero() {
  return (
    <section id="home" className="bg-fadezone-light py-12 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
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
              className="bg-fadezone-black px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-light transition-transform hover:bg-fadezone-charcoal"
            >
              Book Your Appointment
            </a>
            <a
              href="#services"
              className="border border-fadezone-black px-6 py-4 text-xs font-bold uppercase tracking-[0.14em] text-fadezone-black transition-transform hover:bg-fadezone-black hover:text-fadezone-light"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Right: staggered collage */}
        <div className="grid w-full max-w-sm grid-cols-2 gap-3 justify-self-center lg:justify-self-end">
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
