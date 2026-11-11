import barber1 from "../assets/barbers-section-images/MelbenJay.jpg";
import barber2 from "../assets/barbers-section-images/SiegfredOpiana.jpg";

const BARBERS = [
  { name: "Melben Jay", role: "Head barber", image: barber1 },
  { name: "Siegfred Opiana", role: "Regular Barber", image: barber2 },
];

function BarberCard({ name, role, image }) {
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
        <div>
          <h3 className="font-heading text-xl leading-none tracking-wide sm:text-2xl">
            {name}
          </h3>
          <p className="mt-1 font-body text-xs text-fadezone-silver sm:text-sm">
            {role}
          </p>
        </div>
        <a
          href="#contact"
          className="bg-white px-4 py-2 text-center font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-black transition hover:bg-fadezone-silver focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Book Me
        </a>
      </div>
    </article>
  );
}

export default function BarbersSection() {
  return (
    <section
      id="barbers"
      className="scroll-mt-24 bg-fadezone-light py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-5xl leading-none tracking-wide text-fadezone-black md:text-6xl">
          Meet the barbers
        </h2>
        <p className="mt-3 max-w-md font-body text-fadezone-charcoal">
          The hands behind every cut.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {BARBERS.map((b) => (
            <BarberCard key={b.name} {...b} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#barbers"
            className="w-55 inline-block bg-fadezone-black px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-fadezone-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fadezone-black"
          >
            Meet Our Barbers
          </a>
        </div>
      </div>
    </section>
  );
}
