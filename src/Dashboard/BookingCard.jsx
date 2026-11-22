const STATUS_CONFIG = {
  pending: {
    label: "Pending Receipt Approval",
    badgeClass:
      "border-fadezone-accent bg-fadezone-accent/15 text-fadezone-accent",
  },
  approved: {
    label: "Approved • Slot Locked",
    badgeClass: "border-emerald-500/60 bg-emerald-950/40 text-emerald-300",
  },
  rejected: {
    label: "Rejected • Slot Freed",
    badgeClass: "border-red-500/60 bg-red-950/40 text-red-300",
  },
};

export default function BookingCard({
  booking,
  onApprove,
  onReject,
  onInspectReceipt,
}) {
  const statusMeta = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending;

  return (
    <article className="relative border border-fadezone-accent/40 bg-fadezone-surface p-5 sm:p-6">
      {/* Corner Viewfinder Brackets */}
      <span className="pointer-events-none absolute left-2 top-2 h-2.5 w-2.5 border-l-2 border-t-2 border-fadezone-accent" />
      <span className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 border-r-2 border-t-2 border-fadezone-accent" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-fadezone-accent" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-fadezone-accent" />

      {/* Top Ticket Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-fadezone-text/25 pb-4">
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl uppercase tracking-wider text-fadezone-accent">
            {booking.id}
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-fadezone-text/50">
            • {booking.submittedAt}
          </span>
        </div>

        <span
          className={`border px-3 py-1 font-body text-[10px] font-bold uppercase tracking-[0.2em] ${statusMeta.badgeClass}`}
        >
          {statusMeta.label}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto]">
        {/* Booking Details */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/55">
              Client
            </p>
            <p className="mt-1 font-heading text-2xl uppercase tracking-wide text-fadezone-text">
              {booking.fullName}
            </p>
            <a
              href={`tel:${booking.phone}`}
              className="mt-0.5 inline-block font-body text-xs tracking-[0.15em] text-fadezone-accent hover:underline"
            >
              {booking.phone}
            </a>
          </div>

          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/55">
              Assigned Chair
            </p>
            <p className="mt-1 font-body text-sm font-bold uppercase tracking-[0.12em] text-fadezone-text">
              {booking.barber}
            </p>
            <p className="mt-0.5 font-body text-xs uppercase tracking-[0.15em] text-fadezone-accent">
              {booking.date} • {booking.timeSlot}
            </p>
          </div>

          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/55">
              Requested Cut
            </p>
            <p className="mt-1 font-body text-xs font-bold uppercase tracking-[0.14em] text-fadezone-text">
              {booking.haircutStyle}
            </p>
          </div>

          <div>
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/55">
              GCash Ref &amp; Split
            </p>
            <p className="mt-1 font-mono text-sm font-bold text-fadezone-text">
              {booking.gcashRef || "No Ref Entered"}
            </p>
            <p className="mt-0.5 font-body text-[11px] uppercase tracking-[0.14em] text-fadezone-text/65">
              ₱{booking.downpayment} Paid • ₱{booking.balanceDue} At Shop
            </p>
          </div>

          {booking.notes && (
            <div className="border-t border-dashed border-fadezone-text/20 pt-3 sm:col-span-2">
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                Dispatch Note
              </p>
              <p className="mt-1 font-body text-xs text-fadezone-text/80">
                {booking.notes}
              </p>
            </div>
          )}
        </div>

        {/* Receipt Thumbnail & Action Controls */}
        <div className="flex flex-col justify-between gap-4 border-t border-dashed border-fadezone-text/25 pt-4 sm:flex-row lg:w-64 lg:flex-col lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          {/* Receipt Thumbnail Button */}
          <button
            type="button"
            onClick={() => onInspectReceipt(booking)}
            className="group flex items-center gap-3 border border-dashed border-fadezone-accent/50 bg-fadezone-background p-2.5 text-left transition-colors hover:border-fadezone-accent"
          >
            <img
              src={booking.receiptUrl}
              alt={`GCash receipt for ${booking.id}`}
              className="h-16 w-12 shrink-0 border border-fadezone-text/20 object-cover"
            />
            <div>
              <span className="block font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-accent">
                GCash Proof
              </span>
              <span className="mt-1 block font-body text-xs font-bold uppercase tracking-[0.14em] text-fadezone-text group-hover:text-fadezone-accent">
                Inspect Receipt →
              </span>
            </div>
          </button>

          {/* Approve / Reject Controls */}
          {booking.status === "pending" ? (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onApprove(booking.id)}
                className="border border-fadezone-accent bg-fadezone-accent px-3 py-2.5 font-body text-xs font-bold uppercase tracking-[0.18em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => onReject(booking.id)}
                className="border border-red-500/60 bg-transparent px-3 py-2.5 font-body text-xs font-bold uppercase tracking-[0.18em] text-red-300 transition-colors hover:bg-red-950/50"
              >
                Reject
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between border border-dashed border-fadezone-text/20 bg-fadezone-background/60 px-3 py-2">
              <span className="font-body text-[10px] uppercase tracking-[0.18em] text-fadezone-text/60">
                {booking.status === "approved" ? "Seat Confirmed" : "Slot Open"}
              </span>
              <button
                type="button"
                onClick={() =>
                  booking.status === "approved"
                    ? onReject(booking.id)
                    : onApprove(booking.id)
                }
                className="font-body text-[10px] font-bold uppercase tracking-[0.18em] text-fadezone-accent hover:underline"
              >
                {booking.status === "approved" ? "Revoke" : "Re-Approve"}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}