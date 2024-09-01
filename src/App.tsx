// import { useState } from "react";
import "./App.css";

// import Sidebar from "./components/sidebar/Sidebar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Resume from "./components/resume/Resume";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  // const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [theme, setTheme] = useState(defaultDark ? "light" : "light");

  // const switchTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  // };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // <div className="app" data-theme={theme}>
    <div className="app">
      {/* <Sidebar theme={theme} switchTheme={switchTheme} /> */}
      <main className="main">
        <Home />
        <About />
        <Services />
        <Resume />
        <Portfolio />
        <Testimonials />
        <Blog />
        {/* <Contact theme={theme} /> */}
        <Contact />
      </main>
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
}

export default App;
