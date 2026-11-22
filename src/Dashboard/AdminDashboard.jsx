import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import AdminLogin from "./AdminLogin";
import BookingCard from "./BookingCard";
import ReceiptModal from "./ReceiptModal";
import { INITIAL_BOOKINGS } from "./mockBookings";

const FILTER_TABS = [
  { key: "pending", label: "Pending Verification" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All Records" },
];

const BARBER_OPTIONS = [
  "All Chairs",
  "Melben Jay (Chair 01)",
  "Siegfred Opiana (Chair 02)",
  "Mark Eito (Chair 03)",
  "Any Available Barber",
];

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState(null);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [barberFilter, setBarberFilter] = useState("All Chairs");
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState(null);

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === "pending").length;
    const approvedList = bookings.filter((b) => b.status === "approved");
    const rejected = bookings.filter((b) => b.status === "rejected").length;
    const verifiedDeposits = approvedList.reduce(
      (sum, b) => sum + b.downpayment,
      0
    );
    const expectedShopBalance = approvedList.reduce(
      (sum, b) => sum + b.balanceDue,
      0
    );

    return {
      pending,
      approved: approvedList.length,
      rejected,
      all: bookings.length,
      verifiedDeposits,
      expectedShopBalance,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === "all" ? true : booking.status === activeTab;

      const matchesBarber =
        barberFilter === "All Chairs" ? true : booking.barber === barberFilter;

      const matchesQuery =
        !query ||
        booking.fullName.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query) ||
        booking.phone.toLowerCase().includes(query) ||
        (booking.gcashRef && booking.gcashRef.toLowerCase().includes(query));

      return matchesTab && matchesBarber && matchesQuery;
    });
  }, [bookings, activeTab, barberFilter, searchQuery]);

  const handleApprove = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "approved" } : b))
    );
  };

  const handleReject = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "rejected" } : b))
    );
  };

  if (!adminUser) {
    return <AdminLogin onLoginSuccess={(user) => setAdminUser(user)} />;
  }

  return (
    <section className="min-h-screen bg-fadezone-background py-10 text-fadezone-text sm:py-14">
      <Container>
        {/* Top Dispatch Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-6">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
              FadeZone Subic • Shop Dispatch ({adminUser.username})
            </p>
            <h1 className="mt-1 font-heading text-4xl uppercase tracking-wide sm:text-5xl">
              Booking Verification
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="border border-fadezone-text/30 bg-fadezone-surface px-4 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/80 transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
            >
              View Public Site
            </Link>
            <button
              type="button"
              onClick={() => setAdminUser(null)}
              className="border border-fadezone-accent bg-fadezone-accent px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
            >
              Lock Dispatch
            </button>
          </div>
        </div>

        {/* Summary Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="border border-fadezone-accent/50 bg-fadezone-surface p-4">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
              Pending Verification
            </p>
            <p className="mt-2 font-heading text-4xl text-fadezone-text">
              {stats.pending}
            </p>
            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-fadezone-text/55">
              Awaiting GCash check
            </p>
          </div>

          <div className="border border-dashed border-fadezone-text/25 bg-fadezone-surface p-4">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/65">
              Approved Slots
            </p>
            <p className="mt-2 font-heading text-4xl text-fadezone-text">
              {stats.approved}
            </p>
            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-fadezone-text/55">
              Locked in schedule
            </p>
          </div>

          <div className="border border-dashed border-fadezone-text/25 bg-fadezone-surface p-4">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/65">
              GCash Collected
            </p>
            <p className="mt-2 font-heading text-4xl text-fadezone-accent">
              ₱{stats.verifiedDeposits}
            </p>
            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-fadezone-text/55">
              40% verified deposits
            </p>
          </div>

          <div className="border border-dashed border-fadezone-text/25 bg-fadezone-surface p-4">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-text/65">
              Balance Due at Shop
            </p>
            <p className="mt-2 font-heading text-4xl text-fadezone-text">
              ₱{stats.expectedShopBalance}
            </p>
            <p className="mt-1 font-body text-[10px] uppercase tracking-[0.16em] text-fadezone-text/55">
              ₱90 per approved cut
            </p>
          </div>
        </div>

        {/* Filter Tabs + Search & Chair Filter */}
        <div className="mt-8 border border-dashed border-fadezone-text/25 bg-fadezone-surface p-4 sm:p-5">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-dashed border-fadezone-text/20 pb-4">
            {FILTER_TABS.map((tab) => {
              const count = stats[tab.key];
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 border px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "border-fadezone-accent bg-fadezone-accent text-fadezone-text"
                      : "border-fadezone-text/20 bg-fadezone-background text-fadezone-text/75 hover:border-fadezone-accent/60 hover:text-fadezone-text"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 text-[10px] ${
                      isActive
                        ? "bg-fadezone-background/30 text-fadezone-text"
                        : "bg-fadezone-surface text-fadezone-accent"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Barber Filter Row */}
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_260px]">
            <div>
              <label htmlFor="dispatch-search" className="sr-only">
                Search bookings
              </label>
              <input
                id="dispatch-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customer name, FZ-XXXX ticket, or GCash ref..."
                className="w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-2.5 font-body text-xs tracking-[0.12em] text-fadezone-text placeholder:text-fadezone-text/40 focus:border-fadezone-accent focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="chair-filter" className="sr-only">
                Filter by chair or barber
              </label>
              <select
                id="chair-filter"
                value={barberFilter}
                onChange={(e) => setBarberFilter(e.target.value)}
                className="w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-2.5 font-body text-xs font-bold uppercase tracking-[0.15em] text-fadezone-text focus:border-fadezone-accent focus:outline-none"
              >
                {BARBER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Booking Ticket Queue */}
        <div className="mt-6 space-y-5">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onApprove={handleApprove}
                onReject={handleReject}
                onInspectReceipt={(item) => setSelectedReceiptBooking(item)}
              />
            ))
          ) : (
            <div className="border border-dashed border-fadezone-text/25 bg-fadezone-surface px-6 py-14 text-center">
              <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
                No Dispatch Records Found
              </p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.16em] text-fadezone-text/60">
                Try switching status tabs or clearing your search/chair filter.
              </p>
            </div>
          )}
        </div>
      </Container>

      {/* Full-Size GCash Receipt Lightbox */}
      <ReceiptModal
        booking={selectedReceiptBooking}
        onClose={() => setSelectedReceiptBooking(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </section>
  );
}