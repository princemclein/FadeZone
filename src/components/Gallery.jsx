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
    <article className="flex flex-col bg-fadezone-charcoal text-white">
      <div className="aspect-4/5 overflow-hidden bg-fadezone-black">
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
          className="bg-white px-4 py-2 text-center font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-black transition hover:bg-fadezone-silver focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
      className="scroll-mt-20 bg-fadezone-light py-16 sm:py-20 lg:scroll-mt-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-center text-5xl leading-none tracking-wide text-fadezone-black md:text-6xl">
          Gallery
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center font-body text-fadezone-charcoal">
          Pick a style, then book your spot. Walk-ins welcome.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mx-auto lg:max-w-5xl">
          {HAIRCUTS.map((h) => (
            <HaircutCard key={h.name} {...h} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#gallery"
            className="w-45 inline-block bg-fadezone-black px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-fadezone-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-black"
          >
            View all
          </a>
        </div>
      </div>
    </section>
  );
}
