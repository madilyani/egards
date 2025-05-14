import Benefits from "./components/benefits";
import Contact from "./components/contact";
import Features from "./components/features";
import Hero from "./components/hero";
import Info from "./components/info";
import Services from "./components/services";
import Steps from "./components/steps";

export default function Landing() {
  return (
    <>
      <div className="anchor" id="home"></div>
      <Hero />
      <div className="anchor" id="about"></div>
      <Info />
      <Features />
      <div className="anchor" id="services"></div>
      <Services />
      <Steps />
      <Benefits />
      <div className="anchor" id="contact"></div>
      <Contact />
    </>
  );
}
