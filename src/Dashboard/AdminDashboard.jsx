import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import AdminLogin from "./AdminLogin";
import BookingCard from "./BookingCard";
import ReceiptModal from "./ReceiptModal";

const FILTER_TABS = [
  { key: "pending", label: "Pending Verification" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All Records" },
];

function formatBarberOption(barber) {
  return `${barber.fullName} (${barber.chairLabel})`;
}

function formatBookingDate(value) {
  if (!value) return "";

  const date = new Date(value);

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatBookingTime(value) {
  if (!value) return "";

  const [hours, minutes] = value.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatSubmittedAt(value) {
  if (!value) return "";

  return new Date(value).toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatBooking(booking) {
  return {
    id: booking.booking_code,
    fullName: booking.customer_name,
    phone: booking.customer_mobile,
    haircutStyle: booking.haircut_style,
    barber: booking.barber_name
      ? `${booking.barber_name} (${booking.barber_chair})`
      : "Unassigned",
    date: formatBookingDate(booking.booking_date),
    timeSlot: formatBookingTime(booking.booking_time),
    downpayment: Number(booking.downpayment_amount),
    balanceDue: Number(booking.remaining_balance),
    gcashRef: booking.gcash_reference || "",
    receiptUrl: null,
    status: booking.status,
    notes: booking.customer_notes || "",
    submittedAt: formatSubmittedAt(booking.created_at),
  };
}

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [barbers, setBarbers] = useState([]);

  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");

  const [newBarberName, setNewBarberName] = useState("");
  const [newChairLabel, setNewChairLabel] = useState("");
  const [barberFeedback, setBarberFeedback] = useState("");

  const [editingBarberId, setEditingBarberId] = useState(null);
  const [editBarberName, setEditBarberName] = useState("");
  const [editChairLabel, setEditChairLabel] = useState("");

  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [barberFilter, setBarberFilter] = useState("All Chairs");
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState(null);

useEffect(() => {
  const fetchBarbers = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/barbers/all`,
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch barbers.");
      }

      const formattedBarbers = result.data.map((barber) => ({
        id: barber.id,
        fullName: barber.full_name,
        chairCode: barber.chair_code,
        chairLabel: barber.chair_label,
        displayName: barber.display_name,
        isActive: Boolean(barber.is_active),
      }));

      setBarbers(formattedBarbers);
    } catch (error) {
      console.error("Error fetching barbers:", error);
      setBarberFeedback("Unable to load barbers.");
    }
  };

  const fetchBookings = async () => {
    try {
      setIsLoadingBookings(true);
      setBookingError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/all`,
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch bookings.");
      }

      const formattedBookings = result.data.map(formatBooking);

      setBookings(formattedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookingError(error.message || "Unable to load bookings.");
    } finally {
      setIsLoadingBookings(false);
    }
  };

  fetchBarbers();
  fetchBookings();
}, []);

  const barberOptions = useMemo(() => {
    const activeLabels = barbers
      .filter((b) => b.isActive)
      .map(formatBarberOption);
    return ["All Chairs", ...activeLabels, "Any Available Barber"];
  }, [barbers]);

  const stats = useMemo(() => {
    const pending = bookings.filter((b) => b.status === "pending").length;
    const approvedList = bookings.filter((b) => b.status === "approved");
    const rejected = bookings.filter((b) => b.status === "rejected").length;
    const verifiedDeposits = approvedList.reduce(
      (sum, b) => sum + b.downpayment,
      0,
    );
    const expectedShopBalance = approvedList.reduce(
      (sum, b) => sum + b.balanceDue,
      0,
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

  const handleAddBarber = async (e) => {
    e.preventDefault();

    const trimmedName = newBarberName.trim();
    const usedChairNumbers = barbers
      .map((barber) => Number(barber.chairCode?.replace("CHAIR-", "")))
      .filter(Number.isInteger);

    let nextChairNumber = 1;

    while (usedChairNumbers.includes(nextChairNumber)) {
      nextChairNumber++;
    }

    const formattedChairNumber = String(nextChairNumber).padStart(2, "0");
    const trimmedChair =
      newChairLabel.trim() || `Chair ${formattedChairNumber}`;

    if (!trimmedName) {
      setBarberFeedback("Enter a barber name first.");
      return;
    }

    const chairMatch = trimmedChair.match(/^Chair\s+(\d+)$/i);

    if (!chairMatch) {
      setBarberFeedback("Use the chair format: Chair 05.");
      return;
    }

    const chairCode = `CHAIR-${chairMatch[1].padStart(2, "0")}`;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/barbers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: trimmedName,
          chair_code: chairCode,
          chair_label: trimmedChair,
          display_name: `${trimmedName} - ${trimmedChair}`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add barber.");
      }

      const newBarber = {
        id: result.barberId,
        fullName: trimmedName,
        chairCode,
        chairLabel: trimmedChair,
        displayName: `${trimmedName} - ${trimmedChair}`,
        isActive: true,
      };

      setBarbers((prev) => [...prev, newBarber]);
      setNewBarberName("");
      setNewChairLabel("");
      setBarberFeedback(`Added ${formatBarberOption(newBarber)}.`);
    } catch (error) {
      console.error("Error adding barber:", error);
      setBarberFeedback(error.message || "Unable to add barber.");
    }
  };

  const handleRemoveBarber = async (barberId) => {
    const target = barbers.find((b) => b.id === barberId);
    if (!target) return;

    const formatted = formatBarberOption(target);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/barbers/${barberId}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to remove barber.");
      }

      if (barberFilter === formatted) {
        setBarberFilter("All Chairs");
      }

      setBarbers((prev) =>
        prev.map((b) => (b.id === barberId ? { ...b, isActive: false } : b)),
      );

      setBarberFeedback(`Removed ${formatted} from active chairs.`);
    } catch (error) {
      console.error("Error removing barber:", error);
      setBarberFeedback(error.message || "Unable to remove barber.");
    }
  };

  const handleRestoreBarber = async (barberId) => {
    const target = barbers.find((b) => b.id === barberId);
    if (!target) return;

    const formatted = formatBarberOption(target);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/barbers/${barberId}/activate`,
        {
          method: "PATCH",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to restore barber.");
      }

      setBarbers((prev) =>
        prev.map((b) => (b.id === barberId ? { ...b, isActive: true } : b)),
      );

      setBarberFeedback(`Restored ${formatted}.`);
    } catch (error) {
      console.error("Error restoring barber:", error);
      setBarberFeedback(error.message || "Unable to restore barber.");
    }
  };

  const handleEditBarber = async (barberId) => {
    const trimmedName = editBarberName.trim();
    const trimmedChair = editChairLabel.trim();

    if (!trimmedName || !trimmedChair) {
      setBarberFeedback("Name and chair assignment are required.");
      return;
    }

    const chairMatch = trimmedChair.match(/^Chair\s+(\d+)$/i);

    if (!chairMatch) {
      setBarberFeedback("Use the chair format: Chair 05.");
      return;
    }

    const chairCode = `CHAIR-${chairMatch[1].padStart(2, "0")}`;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/barbers/${barberId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: trimmedName,
            chair_code: chairCode,
            chair_label: trimmedChair,
            display_name: `${trimmedName} - ${trimmedChair}`,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update barber.");
      }

      setBarbers((prev) =>
        prev.map((barber) =>
          barber.id === barberId
            ? {
                ...barber,
                fullName: trimmedName,
                chairCode,
                chairLabel: trimmedChair,
                displayName: `${trimmedName} - ${trimmedChair}`,
              }
            : barber,
        ),
      );

      setEditingBarberId(null);
      setBarberFeedback("Barber updated successfully.");
    } catch (error) {
      console.error("Error updating barber:", error);
      setBarberFeedback(error.message || "Unable to update barber.");
    }
  };

  const handleApprove = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "approved" } : b)),
    );
  };

  const handleReject = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "rejected" } : b)),
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

        {/* Barber & Chair Management */}
        <div className="mt-8 border border-dashed border-fadezone-text/25 bg-fadezone-surface p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-fadezone-text/20 pb-3">
            <div>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-fadezone-accent">
                Roster & Chair Assignment
              </p>
              <h2 className="font-heading text-2xl uppercase tracking-wide">
                Manage Barbers
              </h2>
            </div>
            {barberFeedback && (
              <p className="font-body text-xs uppercase tracking-[0.14em] text-fadezone-accent">
                {barberFeedback}
              </p>
            )}
          </div>

          <form
            onSubmit={handleAddBarber}
            className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px_auto]"
          >
            <input
              type="text"
              value={newBarberName}
              onChange={(e) => setNewBarberName(e.target.value)}
              placeholder="New barber full name (e.g., Carlo Reyes)"
              className="border border-fadezone-text/25 bg-fadezone-background px-4 py-2.5 font-body text-xs tracking-[0.12em] text-fadezone-text placeholder:text-fadezone-text/40 focus:border-fadezone-accent focus:outline-none"
            />
            <input
              type="text"
              value={newChairLabel}
              onChange={(e) => setNewChairLabel(e.target.value)}
              placeholder="Chair (e.g., Chair 04)"
              className="border border-fadezone-text/25 bg-fadezone-background px-4 py-2.5 font-body text-xs tracking-[0.12em] text-fadezone-text placeholder:text-fadezone-text/40 focus:border-fadezone-accent focus:outline-none"
            />
            <button
              type="submit"
              className="border border-fadezone-accent bg-fadezone-accent px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent"
            >
              + Add Barber
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className={`flex items-center gap-3 border px-3.5 py-2 font-body text-xs uppercase tracking-[0.14em] ${
                  barber.isActive
                    ? "border-fadezone-text/25 bg-fadezone-background text-fadezone-text"
                    : "border-dashed border-fadezone-text/20 bg-fadezone-background/40 text-fadezone-text/45 line-through"
                }`}
              >
                {editingBarberId === barber.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      value={editBarberName}
                      onChange={(e) => setEditBarberName(e.target.value)}
                      placeholder="Barber name"
                      className="w-36 border border-fadezone-text/25 bg-fadezone-surface px-2 py-1 text-xs"
                    />

                    <input
                      type="text"
                      value={editChairLabel}
                      onChange={(e) => setEditChairLabel(e.target.value)}
                      placeholder="Chair 05"
                      className="w-24 border border-fadezone-text/25 bg-fadezone-surface px-2 py-1 text-xs"
                    />

                    <button
                      type="button"
                      onClick={() => handleEditBarber(barber.id)}
                      className="border border-fadezone-accent px-2 py-1 text-[10px] font-bold"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setEditingBarberId(null)}
                      className="border border-fadezone-text/25 px-2 py-1 text-[10px] font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <span>{formatBarberOption(barber)}</span>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setEditingBarberId(barber.id);
                    setEditBarberName(barber.fullName);
                    setEditChairLabel(barber.chairLabel);
                    setBarberFeedback("");
                  }}
                  className="border border-fadezone-accent/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-fadezone-accent transition-colors hover:bg-fadezone-accent hover:text-fadezone-text"
                >
                  Edit
                </button>

                {barber.isActive ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveBarber(barber.id)}
                    className="border border-fadezone-text/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-fadezone-text/75 transition-colors hover:border-red-400 hover:text-red-400"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRestoreBarber(barber.id)}
                    className="border border-fadezone-accent/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-fadezone-accent no-underline transition-colors hover:bg-fadezone-accent hover:text-fadezone-text"
                  >
                    Restore
                  </button>
                )}
              </div>
            ))}
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
                {barberOptions.map((option) => (
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
