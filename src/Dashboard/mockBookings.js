const createMockReceiptDataUrl = ({ refNo, amount, sender, dateTime }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="680" viewBox="0 0 420 680">
      <rect width="420" height="680" fill="#007DFE" />
      <rect x="24" y="36" width="372" height="608" rx="18" fill="#FFFFFF" />
      <circle cx="210" cy="96" r="28" fill="#007DFE" />
      <path d="M197 96l9 9 18-19" stroke="#FFFFFF" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      <text x="210" y="148" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#0F172A">GCash Express Send</text>
      <text x="210" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#64748B">FadeZone Barbershop • Subic</text>
      <line x1="48" y1="196" x2="372" y2="196" stroke="#CBD5E1" stroke-dasharray="6 6" />
      <text x="210" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748B">AMOUNT SENT (40% DOWNPAYMENT)</text>
      <text x="210" y="278" text-anchor="middle" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#007DFE">PHP ${amount}.00</text>
      <line x1="48" y1="306" x2="372" y2="306" stroke="#CBD5E1" stroke-dasharray="6 6" />
      <text x="56" y="346" font-family="Arial, sans-serif" font-size="13" fill="#64748B">Sender</text>
      <text x="364" y="346" text-anchor="end" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0F172A">${sender}</text>
      <text x="56" y="384" font-family="Arial, sans-serif" font-size="13" fill="#64748B">Ref No.</text>
      <text x="364" y="384" text-anchor="end" font-family="monospace" font-size="14" font-weight="bold" fill="#0F172A">${refNo}</text>
      <text x="56" y="422" font-family="Arial, sans-serif" font-size="13" fill="#64748B">Date &amp; Time</text>
      <text x="364" y="422" text-anchor="end" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0F172A">${dateTime}</text>
      <text x="56" y="460" font-family="Arial, sans-serif" font-size="13" fill="#64748B">Status</text>
      <text x="364" y="460" text-anchor="end" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#16A34A">COMPLETED</text>
      <rect x="56" y="510" width="308" height="72" rx="10" fill="#F1F5F9" />
      <text x="210" y="542" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#475569">MOCK RECEIPT PREVIEW (STEP 1 UI)</text>
      <text x="210" y="562" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#475569">Flat Rate ₱150 • Balance Due ₱90 at Shop</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const INITIAL_BOOKINGS = [
  {
    id: "FZ-1041",
    fullName: "Marco Dela Cruz",
    phone: "0917-555-0192",
    haircutStyle: "Mid Skin Fade + Textured Crop",
    barber: "Melben Jay (Chair 01)",
    date: "2026-11-21",
    timeSlot: "09:00 AM",
    downpayment: 60,
    balanceDue: 90,
    gcashRef: "8049123456781",
    receiptUrl: createMockReceiptDataUrl({
      refNo: "8049123456781",
      amount: 60,
      sender: "MARCO D.",
      dateTime: "Nov 21, 2026 08:14 AM",
    }),
    status: "pending",
    notes: "Clean razor lineup on forehead and beard.",
    submittedAt: "08:15 AM",
  },
  {
    id: "FZ-1042",
    fullName: "Jayson Reyes",
    phone: "0928-555-0438",
    haircutStyle: "Low Taper Fade + Mullet",
    barber: "Siegfred Opiana (Chair 02)",
    date: "2026-11-21",
    timeSlot: "11:00 AM",
    downpayment: 60,
    balanceDue: 90,
    gcashRef: "8049123456904",
    receiptUrl: createMockReceiptDataUrl({
      refNo: "8049123456904",
      amount: 60,
      sender: "JAYSON R.",
      dateTime: "Nov 21, 2026 09:02 AM",
    }),
    status: "pending",
    notes: "Keep length at the back, light shear trim on top.",
    submittedAt: "09:05 AM",
  },
  {
    id: "FZ-1039",
    fullName: "Kenji Navarro",
    phone: "0995-555-0811",
    haircutStyle: "Burst Fade + Hard Part",
    barber: "Mark Eito (Chair 03)",
    date: "2026-11-21",
    timeSlot: "02:00 PM",
    downpayment: 60,
    balanceDue: 90,
    gcashRef: "8049123456112",
    receiptUrl: createMockReceiptDataUrl({
      refNo: "8049123456112",
      amount: 60,
      sender: "KENJI N.",
      dateTime: "Nov 20, 2026 07:45 PM",
    }),
    status: "approved",
    notes: "",
    submittedAt: "Yesterday",
  },
  {
    id: "FZ-1038",
    fullName: "Rafael Mendoza",
    phone: "0918-555-0674",
    haircutStyle: "High Fade + Pompadour",
    barber: "Any Available Barber",
    date: "2026-11-21",
    timeSlot: "04:00 PM",
    downpayment: 60,
    balanceDue: 90,
    gcashRef: "8049123456009",
    receiptUrl: createMockReceiptDataUrl({
      refNo: "8049123456009",
      amount: 60,
      sender: "RAFAEL M.",
      dateTime: "Nov 20, 2026 06:10 PM",
    }),
    status: "approved",
    notes: "Prefer Chair 01 if open.",
    submittedAt: "Yesterday",
  },
  {
    id: "FZ-1035",
    fullName: "Carlo Bautista",
    phone: "0906-555-0299",
    haircutStyle: "Buzz Cut + Design",
    barber: "Melben Jay (Chair 01)",
    date: "2026-11-21",
    timeSlot: "07:00 AM",
    downpayment: 60,
    balanceDue: 90,
    gcashRef: "0000000000000",
    receiptUrl: createMockReceiptDataUrl({
      refNo: "0000000000000",
      amount: 10,
      sender: "CARLO B.",
      dateTime: "Nov 20, 2026 05:22 PM",
    }),
    status: "rejected",
    notes: "Short downpayment amount (₱10 sent instead of ₱60).",
    submittedAt: "Yesterday",
  },
];