import "./App.css";
import { SWRConfig } from "swr";
import { localStorageProvider } from "./utils/swrUtils";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Resume from "./components/resume/Resume";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { FaArrowUp } from "react-icons/fa";

function App() {
  const scrollToTop = () => {
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <SWRConfig value={{ provider: localStorageProvider }}>
      <div className="app">
        <main className="main">
          <Home />
          <About />
          <Services />
          <Resume />
          <Portfolio />
          <Testimonials />
          <Blog />
          <Contact />
        </main>
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
        <SpeedInsights />
        <Analytics />
      </div>
    </SWRConfig>
  );
}

export default App;
