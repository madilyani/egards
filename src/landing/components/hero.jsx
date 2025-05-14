import styles from "../landing.module.scss";
import banner from "@/assets/images/hero.png";
import {motion } from "framer-motion";

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay },
  },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10, delay },
  },
});
export default function Hero() {
  return (
    <section className={styles["hero"]}>
      <div className="auto__container">
        <div className={styles["hero__inner"]}>
          <div className={styles["hero__inner-title"]}>
            <motion.h1 {...fadeInUp(0.2)}>
              24/7 bereikbaarheid en beheer op afstand voor uw parkeerlocatie
            </motion.h1>
            <motion.p {...fadeInUp(0.3)}>
              Onze specialisten staan dag en nacht klaar om het bezoek van uw
              parkeerfaciliteit te ondersteunen, problemen snel op te lossen en
              de juiste acties uit te zetten. Neem contact met ons op om te
              kijken naar de mogelijkheden voor uw parkeerlocatie.
            </motion.p>
            <motion.div
              {...fadeInUp(0.4)}
              className={styles["hero__inner-buttons"]}
            >
              <button type="button" className="button primary">
                Neem contact op
              </button>
              <button type="button" className="button secondary">
                Meer weten
              </button>
            </motion.div>
          </div>
          <div className={styles["heroBanner"]}>
            <img src={banner} alt="" />
          </div>
          <div  className={styles["hero__inner-row"]}>
            <motion.div {...fadeInUp(0.5)} className={styles["heroTag"]}>
              24/7 Bereikbaarheid en assistentie
            </motion.div>
            <motion.div {...fadeInUp(0.6)} className={styles["heroTag"]}>
              Besturing, aansturing en opvolging
            </motion.div>
            <motion.div {...fadeInUp(0.7)} className={styles["heroTag"]}>Rapportage en inzicht</motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
