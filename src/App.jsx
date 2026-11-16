import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Barbers from "./components/Barbers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Pages;
import AllGallery from "./pages/AllGallery";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
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

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<AllGallery />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
