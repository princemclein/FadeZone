import Container from "../components/Container";

export default function AdminDashboard() {
  return (
    <section className="min-h-screen bg-fadezone-background py-16 text-fadezone-text">
      <Container>
        <p className="font-body text-xs font-bold uppercase tracking-[0.25em] text-fadezone-accent">
          FadeZone • Dispatch Gate
        </p>
        <h1 className="mt-2 font-heading text-4xl uppercase tracking-wide">
          Admin Dashboard
        </h1>
      </Container>
    </section>
  );
}