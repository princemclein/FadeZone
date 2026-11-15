const STATS = [
  {
    index: "01",
    value: "2026",
    label: "Established",
    description: "Since June 12, 2026",
  },
  {
    index: "02",
    value: "₱150",
    label: "Fixed Haircut Price",
    description: "One straightforward price",
  },
  {
    index: "03",
    value: "100%",
    label: "Focus on Haircuts",
    description: "Dedicated to the craft",
  },
  {
    index: "04",
    value: "YES!",
    label: "Walk-ins Welcome",
    description: "Drop by anytime during shop hours",
  },
];

export default function Stats() {
  return (
    <section className="w-full border-y border-fadezone-accent/30 bg-fadezone-surface">
      <div className="grid w-full grid-cols-1 divide-y divide-dashed divide-fadezone-text/20 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={`group flex flex-col justify-between px-6 py-8 transition-colors hover:bg-fadezone-background/35 sm:px-8 sm:py-10 lg:px-10 ${
              idx < 2
                ? "sm:border-b sm:border-dashed sm:border-fadezone-text/20 lg:border-b-0"
                : ""
            } ${
              idx % 2 === 0
                ? "sm:border-r sm:border-dashed sm:border-fadezone-text/20"
                : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                {stat.index}
              </span>
              <span className="h-px w-6 bg-fadezone-accent/40 transition-all duration-300 group-hover:w-10 group-hover:bg-fadezone-accent" />
            </div>

            <div className="my-4">
              <p className="font-heading text-3xl leading-none tracking-wide text-fadezone-text sm:text-4xl">
                {stat.value}
              </p>
            </div>

            <div>
              <h2 className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                {stat.label}
              </h2>
              <p className="mt-1 font-body text-xs leading-5 text-fadezone-text/65">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
