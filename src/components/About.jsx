import Container from "./Container";
import AboutImg from "../assets/about-images/about-img.png";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-8 bg-fadezone-light py-16 md:py-24"
    >
      <Container className="flex flex-col gap-10 md:gap-14">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fadezone-black/60">
            Who We Are
          </p>
          <h2 className="mt-2 font-heading text-4xl uppercase leading-none text-fadezone-black sm:text-5xl lg:text-6xl">
            More than just a haircut
          </h2>
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-md">
            <img
              src={AboutImg}
              alt="FadeZone Interior"
              className="aspect-square w-full border-2 border-dashed border-fadezone-black object-cover"
            />
          </div>

          <div className="max-w-xl text-left">
            <h3 className="font-heading text-justify text-3xl uppercase leading-none text-fadezone-black sm:text-4xl">
              Built on style. Defined by precision.
            </h3>
            <p className="mt-5 text-sm leading-7 text-fadezone-black sm:text-base">
              Founded on June 12, 2026, FadeZone was established with a passion
              for barbering and personal style. What started as a vision to
              provide quality haircuts became a place where customers can
              express themselves through their look.
              <span className="mt-4 block">
                At FadeZone, every cut is an opportunity to bring out
                confidence, individuality, and style.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
