import { Route, Routes } from "react-router-dom";
import Landing from "./landing/landing";
import Header from "./base/header/header";
import { useEffect } from "react";
import "./assets/css/main.scss";
import Lenis from "lenis";
function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
