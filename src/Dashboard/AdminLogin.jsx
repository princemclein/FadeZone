import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setError("Enter both shop ID and dispatch passcode.");
      return;
    }

    setIsSubmitting(true);

    // STEP 1 (Frontend UI Preview): Temporary check so you can test the flow.
    // STEP 2 (Express + MySQL): Replace this block with:
    //   const res = await fetch("/api/admin/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     credentials: "include",
    //     body: JSON.stringify({ username: trimmedUser, password }),
    //   });
    setTimeout(() => {
      if (trimmedUser.toLowerCase() === "admin" && password === "fadezone150") {
        onLoginSuccess({ username: trimmedUser });
      } else {
        setError("Invalid credentials. Access to Shop Dispatch denied.");
      }
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <section className="relative flex min-h-screen items-center bg-fadezone-background py-14 text-fadezone-text">
      <Container className="flex flex-col items-center">
        {/* Top Back Link */}
        <div className="mb-8 flex w-full max-w-md items-center justify-between border-b border-dashed border-fadezone-text/25 pb-4">
          <Link
            to="/"
            className="font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/75 transition-colors hover:text-fadezone-accent"
          >
            ← Return to Shop
          </Link>
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] text-fadezone-accent">
            Restricted • Staff Only
          </span>
        </div>

        {/* Vintage Dispatch Login Ticket */}
        <div className="relative w-full max-w-md border border-fadezone-accent/50 bg-fadezone-surface p-7 sm:p-9">
          {/* Corner Viewfinder Brackets */}
          <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-fadezone-accent" />
          <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-fadezone-accent" />
          <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-fadezone-accent" />
          <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-fadezone-accent" />

          {/* Ticket Header */}
          <div className="border-b border-dashed border-fadezone-text/25 pb-6 text-center">
            <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-fadezone-accent">
              FadeZone Barbershop • Subic, Zambales
            </p>
            <h1 className="mt-2 font-heading text-4xl uppercase tracking-wide text-fadezone-text">
              Dispatch Gate
            </h1>
            <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-fadezone-text/65">
              Sign in to verify GCash receipts &amp; manage chairs
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            {error && (
              <div
                role="alert"
                className="border border-dashed border-red-400/70 bg-red-950/30 px-4 py-3 font-body text-xs font-bold uppercase tracking-[0.15em] text-red-300"
              >
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="admin-username"
                className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/85"
              >
                Shop ID / Username
              </label>
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="block font-body text-xs font-bold uppercase tracking-[0.2em] text-fadezone-text/85"
                >
                  Passcode
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-fadezone-accent transition-opacity hover:opacity-80"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="mt-2 w-full border border-fadezone-text/25 bg-fadezone-background px-4 py-3 font-body text-sm text-fadezone-text placeholder:text-fadezone-text/35 focus:border-fadezone-accent focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-fadezone-accent bg-fadezone-accent px-6 py-3.5 font-body text-xs font-bold uppercase tracking-[0.22em] text-fadezone-text transition-colors hover:bg-fadezone-background hover:text-fadezone-accent disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Verifying Clearance..." : "Unlock Dispatch"}
            </button>
          </form>

          {/* Ticket Stub Footer */}
          <div className="mt-6 border-t border-dashed border-fadezone-text/25 pt-4 text-center">
            <p className="font-body text-[10px] uppercase tracking-[0.22em] text-fadezone-text/50">
              Authorized Personnel Only • Est. 2027
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}