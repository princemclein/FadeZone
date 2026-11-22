import { useEffect } from "react";

export default function ReceiptModal({
  booking,
  onClose,
  onApprove,
  onReject,
}) {
  useEffect(() => {
    if (!booking) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [booking, onClose]);

  if (!booking) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Receipt verification for ${booking.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-fadezone-background/85 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto border border-fadezone-accent bg-fadezone-surface p-6 text-fadezone-text sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Viewfinder Brackets */}
        <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-fadezone-accent" />
        <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-fadezone-accent" />
        <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-fadezone-accent" />
        <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-fadezone-accent" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-4">
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
              GCash Receipt Inspection • {booking.id}
            </p>
            <h2 className="mt-1 font-heading text-3xl uppercase tracking-wide">
              {booking.fullName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close receipt modal"
            className="flex h-10 w-10 items-center justify-center border border-fadezone-accent/50 bg-fadezone-background font-body text-lg text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
          >
            ✕
          </button>
        </div>

        {/* Receipt Metadata Strip */}
        <div className="mt-4 grid grid-cols-2 gap-3 border border-dashed border-fadezone-text/25 bg-fadezone-background p-4 sm:grid-cols-3">
          <div>
            <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-fadezone-text/55">
              GCash Ref No.
            </span>
            <span className="mt-1 block font-mono text-sm font-bold text-fadezone-accent">
              {booking.gcashRef || "N/A"}
            </span>
          </div>
          <div>
            <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-fadezone-text/55">
              Required Deposit
            </span>
            <span className="mt-1 block font-body text-sm font-bold uppercase text-fadezone-text">
              ₱{booking.downpayment}.00 (40%)
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block font-body text-[10px] uppercase tracking-[0.2em] text-fadezone-text/55">
              Slot &amp; Chair
            </span>
            <span className="mt-1 block font-body text-xs font-bold uppercase text-fadezone-text">
              {booking.timeSlot} • {booking.barber.split(" (")[0]}
            </span>
          </div>
        </div>

        {/* Full-Size Receipt Image */}
        <div className="mt-5 flex justify-center border border-dashed border-fadezone-text/25 bg-fadezone-background p-4">
          <img
            src={booking.receiptUrl}
            alt={`Full-size GCash receipt for ${booking.fullName}`}
            className="max-h-[52vh] w-auto object-contain"
          />
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-dashed border-fadezone-text/25 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-fadezone-text/30 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80 transition-colors hover:border-fadezone-text hover:text-fadezone-text"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onReject(booking.id);
              onClose();
            }}
            className="border border-red-500/60 px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-red-300 transition-colors hover:bg-red-950/50"
          >
            Reject Booking
          </button>

          <button
            type="button"
            onClick={() => {
              onApprove(booking.id);
              onClose();
            }}
            className="border border-fadezone-accent bg-fadezone-accent px-6 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
          >
            Approve &amp; Lock Slot
          </button>
        </div>
      </div>
    </div>
  );
}