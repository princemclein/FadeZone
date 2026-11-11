import { useState } from "react";
// TODO: replace names, prices, and images with the client's real menu.
// `slug` doubles as the card's id, so footer links like #fade scroll to it.
// Put images in /public/images/services/<slug>.jpg (4:5 portrait works best).
const SERVICES = [
  {
    slug: "haircut",
    name: "Haircut",
    price: 150,
    category: "Haircuts",
    featured: true,
  },
  {
    slug: "fade",
    name: "Fade",
    price: 200,
    category: "Haircuts",
    featured: true,
  },
  {
    slug: "beard-trim",
    name: "Beard trim",
    price: 100,
    category: "Beard & shave",
    featured: true,
  },
  {
    slug: "hot-towel-shave",
    name: "Hot towel shave",
    price: 180,
    category: "Beard & shave",
    featured: true,
  },
  {
    slug: "kids-cut",
    name: "Kids cut",
    price: 120,
    category: "Kids",
    featured: true,
  },
  {
    slug: "cut-and-beard",
    name: "Cut + beard",
    price: 250,
    category: "Haircuts",
    featured: true,
  },
  { slug: "taper-fade", name: "Taper fade", price: 220, category: "Haircuts" },
  { slug: "buzz-cut", name: "Buzz cut", price: 100, category: "Haircuts" },
  { slug: "hair-wash", name: "Hair wash", price: 50, category: "Extras" },
  { slug: "hair-color", name: "Hair color", price: 600, category: "Extras" },
];

// Image on top, name + ticket-stub price below (echoes the footer's "Next!" card).
function ServiceCard({ slug, name, price }) {
  return (
    <article
      id={slug}
      className="flex scroll-mt-28 flex-col bg-fadezone-charcoal text-white"
    >
      <div className="aspect-[4/5] overflow-hidden bg-fadezone-black">
        <img
          src={`/images/services/${slug}.jpg`}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
        <h3 className="font-heading text-xl leading-none tracking-wide sm:text-2xl">
          {name}
        </h3>
        <span className="shrink-0 border border-dashed border-fadezone-silver px-2 py-1 text-xs font-semibold sm:text-sm">
          ₱{price}
        </span>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? SERVICES : SERVICES.filter((s) => s.featured);
  const hasMore = SERVICES.some((s) => !s.featured);

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-fadezone-light py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-heading text-5xl leading-none tracking-wide text-fadezone-black md:text-6xl">
          Pick your cut
        </h2>
        <p className="mt-3 max-w-md font-body text-fadezone-charcoal">
          Prices are per head. Walk-ins welcome.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {list.map((s) => (
            <ServiceCard key={s.slug} {...s} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="bg-fadezone-black px-8 py-3 font-body text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-fadezone-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fadezone-black"
            >
              {showAll ? "Back to the basics" : "Browse the cut list"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
