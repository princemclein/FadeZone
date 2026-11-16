import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

const BARBERS = [
  "Any Available Barber",
  "Melben Jay (Chair 01)",
  "Siegfred Opiana (Chair 02)",
  "Mark Eito (Chair 03)",
];

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

function getTodayString() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60 * 1000);
  return local.toISOString().split("T")[0];
}

function formatReadableDate(dateStr) {
  if (!dateStr) return "Select Date";
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Booking() {
  const today = getTodayString();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [haircutStyle, setHaircutStyle] = useState("");
  const [barber, setBarber] = useState(BARBERS[0]);
  const [date, setDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState("02:00 PM");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [ticketCode, setTicketCode] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setError("Please enter your mobile number.");
      return;
    }
    if (!haircutStyle.trim()) {
      setError("Please enter the haircut style you want.");
      return;
    }
    if (!date || !timeSlot) {
      setError("Please select a preferred date and time.");
      return;
    }

    setError("");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setTicketCode(`FZ-${randomNum}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleReset() {
    setTicketCode(null);
    setHaircutStyle("");
    setNotes("");
    setError("");
  }

  return (
    <main className="min-h-screen border-t border-fadezone-accent/30 bg-fadezone-texture py-14 text-fadezone-text sm:py-20 lg:py-24">
      <Container>
        {/* Top Breadcrumb / Back Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-5">
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text/80 transition-colors hover:text-fadezone-accent"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Shop</span>
          </Link>

          <span className="font-body text-[11px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
            CHAIR RESERVATION • FLAT RATE ₱150
          </span>
        </div>

        {/* Editorial Vintage Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-fadezone-text/15 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-fadezone-accent" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-fadezone-accent">
                Dispatch Desk • Subic, Zambales
              </p>
            </div>

            <h1 className="font-heading text-4xl uppercase leading-[0.95] text-fadezone-text sm:text-5xl md:text-6xl">
              Book Your <span className="text-fadezone-accent">Chair.</span>
            </h1>
          </div>

          <p className="max-w-md font-body text-sm leading-7 text-fadezone-text/75 lg:text-right">
            Fill out the reservation slip below to lock in your time slot. All
            cuts are a flat ₱150—pay in person after your session.
          </p>
        </div>

        {/* Confirmed Ticket View vs. Reservation Form */}
        {ticketCode ? (
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="relative border border-fadezone-accent bg-fadezone-surface p-6 text-fadezone-text sm:p-10">
              {/* Corner Viewfinder Brackets */}
              <span className="pointer-events-none absolute top-3 left-3 h-3.5 w-3.5 border-t border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute top-3 right-3 h-3.5 w-3.5 border-t border-r border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-fadezone-accent" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  BOOKING CONFIRMED
                </span>
                <span className="border border-fadezone-accent/60 bg-fadezone-background px-3 py-1 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                  TICKET #{ticketCode}
                </span>
              </div>

              <h2 className="mt-6 font-heading text-3xl uppercase tracking-wide sm:text-4xl">
                See You Soon,{" "}
                <span className="text-fadezone-accent">{fullName}.</span>
              </h2>
              <p className="mt-2 font-body text-sm leading-7 text-fadezone-text/75">
                Your chair at FadeZone Subic is reserved. Please arrive 5–10
                minutes early and present your ticket number at the counter.
              </p>

              <div className="my-6 border-t border-dashed border-fadezone-text/25" />

              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Requested Style
                  </dt>
                  <dd className="mt-1 font-heading text-xl uppercase tracking-wide">
                    {haircutStyle}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Barber
                  </dt>
                  <dd className="mt-1 font-heading text-xl uppercase tracking-wide">
                    {barber}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Date & Time
                  </dt>
                  <dd className="mt-1 font-body text-xs font-bold uppercase tracking-[0.18em] text-fadezone-accent">
                    {formatReadableDate(date)} • {timeSlot}
                  </dd>
                </div>

                <div className="border border-fadezone-text/15 bg-fadezone-background/60 p-3.5">
                  <dt className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Contact & Rate
                  </dt>
                  <dd className="mt-1 font-body text-xs font-bold uppercase tracking-[0.18em]">
                    {phone} • ₱150 (Pay at Shop)
                  </dd>
                </div>
              </dl>

              {notes.trim() && (
                <div className="mt-4 border border-dashed border-fadezone-text/25 bg-fadezone-background/40 p-3.5">
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                    Additional Notes:
                  </span>
                  <p className="mt-1 font-body text-xs leading-6 text-fadezone-text/80">
                    {notes}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="group flex flex-1 items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-accent px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
                >
                  <span>Return Home</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="border border-fadezone-text/30 bg-fadezone-background/60 px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
                >
                  Book Another Slot
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-3xl">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative border border-fadezone-accent/50 bg-fadezone-surface/95 p-6 sm:p-10"
            >
              {/* Corner Viewfinder Brackets */}
              <span className="pointer-events-none absolute top-3 left-3 h-3 w-3 border-t border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute top-3 right-3 h-3 w-3 border-t border-r border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-fadezone-accent" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-fadezone-accent" />

              {/* Form Top Stub */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/25 pb-4">
                <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                  Appointment Form
                </span>
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-fadezone-text/60">
                  Open Daily • 10 AM – 10 PM
                </span>
              </div>

              <div className="mt-7 space-y-6">
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="client-name"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Full Name *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Last Name, First Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client-phone"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      placeholder="0912 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 2: Haircut Style (Free Text) & Barber Select */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="haircut-style"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Haircut / Style *
                    </label>
                    <input
                      id="haircut-style"
                      type="text"
                      placeholder="e.g. Mid Fade, Buzz Cut, Taper..."
                      value={haircutStyle}
                      onChange={(e) => setHaircutStyle(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="barber-select"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Barber
                    </label>
                    <select
                      id="barber-select"
                      value={barber}
                      onChange={(e) => setBarber(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none"
                    >
                      {BARBERS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Date & Time */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Date *
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                    >
                      Preferred Time *
                    </label>
                    <select
                      id="booking-time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text focus:border-fadezone-accent focus:outline-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Optional Notes */}
                <div>
                  <label
                    htmlFor="client-notes"
                    className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80"
                  >
                    Notes / Instructions (Optional)
                  </label>
                  <textarea
                    id="client-notes"
                    rows={3}
                    placeholder="Guard size, lineup preference, or any extra details..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
                  />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-6 border border-fadezone-accent bg-fadezone-background/80 px-4 py-3 font-body text-xs font-bold text-fadezone-accent"
                >
                  {error}
                </p>
              )}

              {/* Bottom Rate & Submit Bar */}
              <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-dashed border-fadezone-text/25 pt-6 sm:flex-row sm:items-center">
                <div>
                  <span className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/60">
                    Flat Rate • Pay At Shop
                  </span>
                  <p className="font-heading text-3xl tracking-wide text-fadezone-accent">
                    ₱150
                  </p>
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 border border-fadezone-accent bg-fadezone-accent px-8 py-4 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent sm:w-auto"
                >
                  <span>Confirm Booking</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </main>
  );
}
