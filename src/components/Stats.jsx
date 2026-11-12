import Container from "./Container";

const STATS = [
  {
    value: "2026",
    label: "Established",
    description: "Since June 12, 2026",
  },
  {
    value: "₱120",
    label: "Fixed Haircut Price",
    description: "One straightforward price",
  },
  {
    value: "100%",
    label: "Focus on Haircuts",
    description: "Dedicated to the craft",
  },
  {
    value: "YES!",
    label: "Walk-ins Welcome",
    description: "Drop by anytime during shop hours",
  },
];

export default function Stats() {
  return (
    <section className="mt-5 bg-fadezone-surface py-6 sm:py-8">
      <Container className="grid grid-cols-2 gap-5 text-center lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5">
            <p className="font-heading text-xl leading-none text-fadezone-text sm:text-2xl">
              {stat.value}
            </p>
            <h2 className="font-body text-xs font-bold uppercase tracking-widest text-fadezone-text">
              {stat.label}
            </h2>
            <p className="font-body text-[0.7rem] text-fadezone-text/70">
              {stat.description}
            </p>
          </div>
        ))}
      </Container>
    </section>
  );
}
