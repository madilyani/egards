import { useState, useEffect, useRef } from "react";
import styles from "../landing.module.scss";
import icon1 from "@/assets/images/steps/1.webp";
import icon2 from "@/assets/images/steps/2.webp";
import icon3 from "@/assets/images/steps/3.webp";
import icon4 from "@/assets/images/steps/4.webp";
import icon5 from "@/assets/images/steps/5.webp";
import icon6 from "@/assets/images/steps/6.webp";
import logo from "@/assets/images/logomark.svg";
import { chevronLeft, chevronRight } from "../../base/SVG";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, delay },
  },
});
const stepsList = [
  {
    id: "1",
    icon: icon1,
    title: "1. Kennismakingsgesprek",
    text: (
      <>
        Inzicht in de behoeften van de faciliteit en de klant: Het proces begint
        met een kennismaking met het huidige parkeersysteem en de prestaties
        ervan. Hierbij worden de doelstellingen van de faciliteit, de
        belangrijkste prestatie-indicatoren en eventuele bekende problemen,
        zoals toegangsproblemen, defecte slagbomen of klantfrustraties, in kaart
        gebracht. <br /> <br />
        Identificatie van knel- en verbeterpunten: Door middel van dit
        kennismakingsgesprek worden knelpunten en verbeterpunten
        geïdentificeerd. Dit zorgt ervoor dat zowel de uitdagingen als de
        mogelijkheden binnen de parkeeroperaties volledig worden begrepen.
      </>
    ),
  },
  {
    id: "2",
    icon: icon2,
    title: "2. Offerte op maat",
    text: "Op basis van de besproken behoeften, wensen en veelvoorkomende vragen op uw faciliteit, stellen wij een offerte op maat op. Hierin kunnen het huidige parkeersysteem, het volume en de gewenste dienstverlening van invloed zijn op de totstandkoming van de juiste prijs.",
  },

  {
    id: "3",
    icon: icon3,
    title: "3. Detailanalyse en toegang tot systemen",
    text: "Wij verzorgen dat we toegang krijgen tot het parkeersysteem en dit waar mogelijk koppelen aan ons zelf ontwikkelde systeem. Daarbij checken wij de meestvoorkomende problemen volgens het parkeersysteem en nemen wij dit mee in het opstellen van het protocol en de instructies voor onze specialisten.",
  },
  {
    id: "4",
    icon: icon4,
    title:
      "4. Opstellen protocol, instrueren personeel en verzorgen telefoonnummer",
    text: (
      <>
        Wij maken een protocol op maat, gebaseerd op uw parkeerfaciliteit, het
        bijbehorende parkeersysteem en de veelvoorkomende vragen/problemen.
        Tevens komt een van onze specialisten optioneel op locatie om een
        inventarisatie te doen en hiervan wordt een informatiedocument opgesteld
        en het personeel geïnstrueerd. <br /> <br />
        Elke parkeerfaciliteit krijgt een eigen telefoonnummer zodat deze snel
        herkend kan worden binnen de systemen. Dit wordt verzorgd door Égards.
      </>
    ),
  },
  {
    id: "5",
    icon: icon5,
    title: "5. Go live en monitoring",
    text: (
      <>
        Wanneer het protocol klaar is en het telefoonnummer bekend, kan de
        parkeerfaciliteit aangesloten worden op de centrale van Égards, waar de
        oproepen 24/7 kunnen worden afgehandeld. <br /> <br />
        Tijdens de eerste weken zullen onze medewerkers de prestaties van het
        CRM nauwlettend volgen en ervoor zorgen dat het systeem naar verwachting
        werkt. In deze fase kan ook het oplossen van problemen en het aanpakken
        van kleine technische kwesties nodig zijn.
      </>
    ),
  },
  {
    id: "6",
    icon: icon6,
    title: "6. Realtime monitoring",
    text: "Onze medewerkers houden de parkeervoorzieningen continu in realtime in de gaten, lossen problemen direct op en zorgen voor een soepele ervaring voor uw klanten.",
  },
];
export default function Steps() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isProgrammaticScroll = useRef(false);
  const touchStartY = useRef(0);
  const scrollDirection = useRef(null);
  const lastScrollTime = useRef(0);
  const scrollProgress = useRef(0);

  // Scroll to step when activeStep changes
  useEffect(() => {
    if (isProgrammaticScroll.current || !sectionRef.current) return;

    const vh = window.innerHeight;
    const targetScroll = sectionRef.current.offsetTop + activeStep * vh;
    const currentScroll = window.scrollY;

    // Only scroll if we're not already at the target
    if (Math.abs(targetScroll - currentScroll) > vh * 0.1) {
      isProgrammaticScroll.current = true;
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  }, [activeStep]);

  // Improved scroll handler with momentum detection
  const handleScroll = () => {
    if (isProgrammaticScroll.current || !sectionRef.current) return;

    const now = Date.now();
    const timeDiff = now - lastScrollTime.current;
    lastScrollTime.current = now;

    const section = sectionRef.current;
    const scrollPosition = window.scrollY;
    const sectionTop = section.offsetTop;
    const vh = window.innerHeight;

    // Calculate raw progress (0 to steps.length)
    const rawProgress = (scrollPosition - sectionTop) / vh;
    scrollProgress.current = rawProgress;

    // Detect scroll direction
    const newDirection = rawProgress > scrollProgress.current ? "down" : "up";
    if (newDirection !== scrollDirection.current) {
      scrollDirection.current = newDirection;
    }

    // Calculate step with smooth progression
    let step;
    const progressInStep = rawProgress % 1;

    if (timeDiff < 50) {
      // Fast scroll
      step = Math.round(rawProgress);
    } else {
      // Slow scroll
      if (scrollDirection.current === "down") {
        step =
          progressInStep > 0.15
            ? Math.ceil(rawProgress)
            : Math.floor(rawProgress);
      } else {
        step =
          progressInStep < 0.85
            ? Math.floor(rawProgress)
            : Math.ceil(rawProgress);
      }
    }

    // Clamp step to valid range
    step = Math.max(0, Math.min(step, stepsList.length - 1));

    if (step !== activeStep) {
      setActiveStep(step);
    }
  };

  // Touch handling with momentum
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    scrollDirection.current = null;
  };

  const handleTouchMove = (e) => {
    if (isProgrammaticScroll.current) return;

    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;

    if (Math.abs(diff) < window.innerHeight * 0.1) return;

    const direction = Math.sign(diff);
    const newStep = activeStep + direction;

    if (newStep >= 0 && newStep < stepsList.length) {
      e.preventDefault();
      isProgrammaticScroll.current = true;
      setActiveStep(newStep);

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  };

  // Set up event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [activeStep]);

  const goToStep = (step) => {
    if (
      isProgrammaticScroll.current ||
      !sectionRef.current ||
      step < 0 ||
      step >= stepsList.length
    )
      return;

    isProgrammaticScroll.current = true;
    setActiveStep(step);

    const vh = window.innerHeight;
    const targetScroll = sectionRef.current.offsetTop + step * vh;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };
  const handleNext = () => {
    const nextStep = Math.min(activeStep + 1, stepsList.length - 1);

    // If we're not at the end yet, just go to next step
    if (nextStep !== activeStep) {
      goToStep(nextStep);
      return;
    }

    // If we're at the end, scroll to just below our section
    if (sectionRef.current) {
      isProgrammaticScroll.current = true;
      const sectionBottom =
        sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      window.scrollTo({
        top: sectionBottom,
        behavior: "smooth",
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  };

  const handlePrev = () => {
    const prevStep = Math.max(activeStep - 1, 0);

    // If we're not at the beginning yet, just go to previous step
    if (prevStep !== activeStep) {
      goToStep(prevStep);
      return;
    }

    // If we're at the beginning, scroll to just above our section
    if (sectionRef.current) {
      isProgrammaticScroll.current = true;
      window.scrollTo({
        top: sectionRef.current.offsetTop - window.innerHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 800);
    }
  };

  return (
    <section
      className={styles["steps"]}
      ref={sectionRef}
      style={{ height: `${(stepsList.length + 1) * 100}vh` }}
    >
      <div className={styles["steps__sticky"]}>
        <div className="auto__container">
          <div className={styles["steps__inner"]}>
            <div className={styles["stepsContent"]}>
              <div className={styles["stepsContent__title"]}>
                <motion.h2 {...fadeInUp(0.1)}>
                  Gebruik maken van de services van Egards?
                </motion.h2>
                <motion.p {...fadeInUp(0.2)}>
                  Om uw parkeerlocatie aan te sluiten op onze dienstverlening,
                  doorlopen wij een standaard stappenplan...
                </motion.p>
              </div>

              <div className={styles["stepsSlider"]}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`step-${activeStep}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StepsItem {...stepsList[activeStep]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className={styles["stepsInfo"]}>
              <div className={styles["stepsInfo__top"]}>
                <h4>
                  Stap {activeStep + 1} van {stepsList.length}
                </h4>
                <div className={styles["stepsInfo__buttons"]}>
                  <button
                    aria-label="Next"
                    onClick={handlePrev}
                    disabled={activeStep === 0}
                    className={activeStep === 0 ? styles["disabled"] : ""}
                  >
                    {chevronLeft}
                  </button>
                  <button
                    aria-label="Preivous"
                    onClick={handleNext}
                    disabled={activeStep === stepsList.length - 1}
                    className={
                      activeStep === stepsList.length - 1
                        ? styles["disabled"]
                        : ""
                    }
                  >
                    {chevronRight}
                  </button>
                </div>
              </div>

              <div className={styles["progress"]}>
                <ProgressBar
                  activeStep={activeStep}
                  progress={(activeStep + 1) / stepsList.length}
                />
              </div>

              <div className={styles["stepsInfo__logo"]}>
                <img src={logo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const StepsItem = (props) => {
  return (
    <div className={styles["stepsItem"]}>
      <div className={styles["stepsItem__icon"]}>
        <img src={props.icon} alt="" />
      </div>
      <h5>{props.title}</h5>
      <p className={styles["stepsItem__content"]}>{props.text}</p>
    </div>
  );
};
const ProgressBar = ({ progress, activeStep }) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [stepPoints, setStepPoints] = useState([]);

  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();
      setPathLength(length);

      // Calculate positions for each step (6 steps total)
      const points = [];
      for (let i = 0; i < 6; i++) {
        // Position at END of each segment by using (i+1)/6
        const stepProgress = (i + 1) / 6;
        const point = path.getPointAtLength(stepProgress * length);

        // Calculate tangent for proper number orientation
        const prevPoint = path.getPointAtLength(stepProgress * length - 1);
        points.push({
          x: point.x,
          y: point.y,
          angle: Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x),
        });
      }
      setStepPoints(points);
    }
  }, []);

  return (
    <svg
      width="936"
      viewBox="0 0 936 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background path */}
      <path
        d="M10 314.63C205.074 382.326 661.378 416.174 926 9.99992"
        stroke="url(#paint0_linear)"
        strokeOpacity="0.2"
        strokeWidth="20"
        strokeLinecap="round"
      />

      {/* Progress path */}
      <path
        ref={pathRef}
        d="M10 314.63C205.074 382.326 661.378 416.174 926 9.99992"
        stroke="#fff"
        strokeOpacity="0.99"
        strokeWidth="25"
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength - pathLength * progress}
      />

      {/* Step numbers */}
      {stepPoints.map((point, index) => {
        const isActive = index <= activeStep; // Changed to < instead of <=
        return (
          <g
            key={index}
            transform={`translate(${point.x}, ${point.y}) rotate(${
              point.angle * (0 / Math.PI)
            })`}
          >
            <text
              x="-4"
              y="7"
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill={isActive ? "#222222" : "#ffffff"}
            >
              {index + 1}
            </text>
          </g>
        );
      })}

      <defs>
        <linearGradient
          id="paint0_linear"
          x1="908.597"
          y1="-23.2692"
          x2="-10.901"
          y2="311.548"
        >
          <stop stopColor="white" stopOpacity="0.4" />
          <stop offset="1" stopColor="white" stopOpacity="0.25" />
        </linearGradient>
      </defs>
    </svg>
  );
};
