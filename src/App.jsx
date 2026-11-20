import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Barbers from "./components/Barbers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AllGallery from "./pages/AllGallery";
import AllBarbers from "./pages/AllBarbers";
import Booking from "./pages/Booking";
import AdminDashboard from "./Dashboard/AdminDashboard" 

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 60);
      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Gallery />
      <Barbers />
      <Contact />
    </>
  );
}

function AppContent() {
  const {pathname} = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
    <ScrollToTop />
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<AllGallery />} />
        <Route path="/barbers" element={<AllBarbers />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
