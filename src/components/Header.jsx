import logo from "../assets/brand/fadezonelogo_nobg.png";

export default function Header() {
  return (
    <>
      <div className="announcement-bar">
        NOW ACCEPTING BOOKINGS — SECURE YOUR NEXT CUT TODAY.
      </div>

      <header className="header">
        <a href="/" className="logo">
          <img src={logo} alt="Fadezon Logo" />
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#barbers">Barbers</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="/booking" className="book-btn">
          Book Now
        </a>
      </header>
    </>
  );
}
