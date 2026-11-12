import highFade from "../assets/gallery-section-images/high-fade.jpg";
import midFade from "../assets/gallery-section-images/mid-fade.jpg";
import taperFade from "../assets/gallery-section-images/taper-fade.jpg";

const HAIRCUTS = [
  { name: "Mid fade", image: midFade },
  { name: "High fade", image: highFade },
  { name: "Taper fade", image: taperFade },
];

function HaircutCard({ name, image }) {
  return (
    <article className="flex flex-col bg-fadezone-surface text-fadezone-text">
      <div className="aspect-4/5 overflow-hidden bg-fadezone-background">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-3 sm:p-4">
        <h3 className="font-heading text-xl leading-none tracking-wide sm:text-2xl">
          {name}
        </h3>
        <a
          href="#contact"
          className="bg-fadezone-text px-4 py-2 text-center font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-background transition hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text"
        >
          Book now
        </a>
      </div>
    </article>
  );
}

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 bg-fadezone-texture py-16 sm:py-20 lg:scroll-mt-10"
    >
      <div className="mx-auto max-w-304 px-4 sm:px-6">
        <h2 className="font-heading text-center text-5xl leading-none tracking-wide text-fadezone-text md:text-6xl">
          Gallery
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center font-body text-fadezone-text">
          Choose your preferred haircut and book your appointment. All haircuts
          are ₱120, and walk-ins are always welcome.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mx-auto lg:max-w-5xl">
          {HAIRCUTS.map((h) => (
            <HaircutCard key={h.name} {...h} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#gallery"
            className="w-45 inline-block bg-fadezone-surface px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition hover:bg-fadezone-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-text"
          >
            View all
          </a>
        </div>
      </div>
    </section>
  );
}
