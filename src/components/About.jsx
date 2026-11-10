import Container from "./Container";

export default function () {
  return (
    <section>
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="text-center">
          <p className="uppercase">Who We Are</p>
          <h1 className="uppercase font-bold font-heading text-5xl">
            More than just a haircut
          </h1>
        </div>
      </Container>
    </section>
  );
}
