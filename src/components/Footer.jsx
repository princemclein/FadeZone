import { useEffect, useState } from "react";

const OPEN_HOUR = 10; // 10 AM
const CLOSE_HOUR = 20; // 8 PM

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const h = new Date().getHours();
      setIsOpen(h >= OPEN_HOUR && h < CLOSE_HOUR);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="bg-black text-white">
      {/* Barber pole strip */}
      <div className="h-3 w-full bg-[repeating-linear-gradient(135deg,#fff_0_12px,#000_12px_24px)]" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
        {/* Left: logo slot + CTA */}
        <div className="flex flex-col gap-8">
          {/* LOGO SLOT: drop your <img> here */}
          <div className="h-20 w-56"></div>

          <p className="font-[Bebas_Neue] text-5xl leading-none tracking-wide md:text-6xl">
            Stay sharp.
            <br />
            Book your cut.
          </p>

          <a
            href="#contact"
            className="w-fit border border-white px-8 py-3 text-sm font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
          >
            Book Now →
          </a>
        </div>

        {/* Right: ticket card */}
        <div className="border border-dashed border-white/40 p-6 md:ml-auto md:w-full md:max-w-md">
          <div className="flex items-center justify-between">
            <span className="font-[Bebas_Neue] text-3xl tracking-wide">
              Next!
            </span>
            <span className="text-xs tracking-[0.2em] text-gray-400">
              NO. 001
            </span>
          </div>

          <div className="my-4 border-t border-dashed border-white/40" />

          {/* Live status */}
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isOpen ? "animate-pulse bg-green-500" : "bg-red-500"
              }`}
            />
            {isOpen ? "Open now · closes 8PM" : "Closed · opens 10AM"}
          </div>

          <div className="my-4 border-t border-dashed border-white/40" />

          {/* Hours */}
          <ul className="space-y-1 text-sm text-gray-400">
            <li className="flex justify-between">
              <span>Mon – Sat</span>
              <span className="text-white">10AM – 8PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-white">10AM – 8PM</span>
            </li>
          </ul>

          <div className="my-4 border-t border-dashed border-white/40" />

          {/* Address + socials */}
          <p className="text-sm text-gray-400">
            Your address here, City, Philippines
          </p>
          <div className="mt-3 flex gap-5 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#" className="transition hover:text-gray-400">
              Facebook
            </a>
            <a href="#" className="transition hover:text-gray-400">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-6 py-5 text-xs uppercase tracking-[0.2em] text-gray-500">
        <span>© 2026 FadeZone</span>
      </div>
    </footer>
  );
}
