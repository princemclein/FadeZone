import { useState } from "react";
import Container from "../components/Container";
import AdminLogin from "./AdminLogin";

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState(null);

  if (!adminUser) {
    return <AdminLogin onLoginSuccess={(user) => setAdminUser(user)} />;
  }

  return (
    <section className="min-h-screen bg-fadezone-background py-12 text-fadezone-text">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-fadezone-text/25 pb-6">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
              FadeZone • Shop Dispatch ({adminUser.username})
            </p>
            <h1 className="mt-1 font-heading text-4xl uppercase tracking-wide">
              Booking Verification
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setAdminUser(null)}
            className="border border-fadezone-accent/60 bg-fadezone-surface px-5 py-2.5 font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text transition-colors hover:border-fadezone-accent hover:text-fadezone-accent"
          >
            Lock Dispatch
          </button>
        </div>

        <p className="mt-8 font-body text-xs uppercase tracking-[0.2em] text-fadezone-text/60">
          Dispatch unlocked — ready to build the booking queue, filters, and receipt modal next.
        </p>
      </Container>
    </section>
  );
}