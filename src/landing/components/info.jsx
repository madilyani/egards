import styles from "../landing.module.scss";
import image1 from "@/assets/images/info/1.png";
import image2 from "@/assets/images/info/2.png";
import classNames from "classnames";
import { useState } from "react";
import FadeIn from "../../base/FadeIn";
import { AnimatePresence, motion } from "framer-motion";
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20, delay },
  },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, delay },
  },
});
const scaleX = (delay = 0) => ({
  initial: { width: 0 },
  whileInView: {
    width: "50%",
    transition: { type: "spring", stiffness: 50, damping: 20, delay },
  },
});
const infoList = [
  {
    id: "1",
    question: "Wat is Parking Assistance?",
    answer: (
      <>
        Het ondersteunen van parkeerders op afstand. Wanneer parkeerders
        problemen ervaren met het parkeren op een locatie, kunnen wij hen daarin
        ondersteunen. Door actief de problemen te analyseren, toegangen open te
        sturen of door een calamiteitendienst aan te sturen zorgen wij voor een
        passende oplossing voor de gebruiker.
        <br /> <br />
        Onze mensen en systemen zijn opgeleid en ingericht om service te
        verlenen voor parkeerders. Deze kennis wordt gebruikt om zowel
        eenvoudige anti-passback situaties te verhelpen, maar ook complexe
        storingen te coördineren.
      </>
    ),
  },
];
export default function Info() {
  const [faq, setFaq] = useState(null);
  return (
    <section className={styles["info"]}>
      <div className="auto__container">
        <div className={styles["info__inner"]}>
          <div className={styles["infoContent"]}>
            <motion.div
              {...fadeInUp(0.1)}
              className={styles["infoContent__title"]}
            >
              <motion.h2 {...fadeInUp(0.2)}>
                Égards Parking Assistance
              </motion.h2>
              <motion.p {...fadeInUp(0.3)}>
                24/7 Ondersteuning op Afstand voor Uw Parkeerlocatie.
              </motion.p>
            </motion.div>
            <div className={styles["infoContent__text"]}>
              <motion.h5 {...fadeInUp(0.4)}>
                Een parkeergarage zonder storingen, minimale stilstand en
                tevreden gebruikers?
              </motion.h5>
              <motion.p {...fadeInUp(0.5)}>
                Égards Parking Assistance biedt 24/7 ondersteuning op afstand,
                waardoor parkeerlocaties efficiënter beheerd kunnen worden. Als
                slim alternatief voor traditionele meldkamers helpt Égards met
                een gespecialiseerd team de veelvoorkomende problemen op
                parkeerlocaties, op afstand op te lossen.
                <br /> <br />
                Dit doen wij met behulp van slimme software, specifiek getraind
                personeel op diverse parkeerbeheersystemen en een focus op enkel
                de parkeermarkt.
              </motion.p>
            </div>
            <motion.div
              {...fadeInUp(0.6)}
              className={styles["infoContent__col"]}
            >
              {infoList.map((item, index) => {
                return (
                  <InfoItem {...item} key={index} setFaq={setFaq} faq={faq} />
                );
              })}
            </motion.div>
          </div>
          <div className={styles["infoBanner"]}>
            <div className={styles["infoBanner__col"]}>
              <motion.div {...scaleX(0.2)} className={styles["infoImage"]}>
                <div className={styles["infoImage__inner"]}>
                  <img src={image1} alt="" />
                </div>
              </motion.div>
              <motion.div {...scaleX(0.3)} className={styles["infoImage"]}>
                <div className={styles["infoImage__inner"]}>
                  <img src={image2} alt="" />
                </div>
              </motion.div>
            </div>
            <div className={styles["infoCircle"]}>
              <div className={styles["infoCircle__inner"]}></div>
              <span></span>
              <span></span>
            </div>
            <button type="button" className="button uniq">
              Neem contact op
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
const InfoItem = (props, faq) => {
  return (
    <div className={styles["infoItem"]}>
      <div
        className={classNames(
          styles["infoItem__head"],
          props.faq === props.id && styles["active"]
        )}
        onClick={() => {
          if (props.faq !== props.id) {
            props.setFaq(props.id);
          } else {
            props.setFaq(null);
          }
        }}
      >
        <h6>{props.question}</h6>
        <span className={props.faq === props.id ? styles["active"] : ""}></span>
      </div>
      <AnimatePresence>
        {props.faq === props.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, height: 0 }}
            className={styles["infoItem__body"]}
          >
            <p>{props.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
