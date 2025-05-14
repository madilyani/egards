import { useState } from "react";
import styles from "../landing.module.scss";
import banner from "@/assets/images/benefits/banner.png";
import shape from "@/assets/images/benefits/shape.svg";
import blur from "@/assets/images/benefits/blur.svg";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
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
import FadeIn from "../../base/FadeIn";

const benefitsList = [
  {
    id: "1",
    title: "24/7 ondersteuning – altijd bereikbaar",
    text: "Wij staan dag en nacht paraat, zodat parkeervragen of storingen direct worden opgelost. Parkeerders worden zo op elk moment van de dag te woord gestaan en geholpen waar nodig",
  },
  {
    id: "2",
    title: "Kostenefficiënte oplossingen – minder stilstand, lagere kosten",
    text: "Door snelle interventie en slimme processen minimaliseren we uitval en frustratie op locatie. Daarbij besparen onze klanten direct op kosten gezien er in veel gevallen geen ondersteuning op locatie nodig is, dit komt doordat wij het grootste gedeelte van de problemen op afstand kunnen oplossen.",
  },
  {
    id: "3",
    title: "Deskundige ondersteuning – voor diverse parkeersystemen ",
    text: "Onze specialisten zijn bekend met de moderne parkeersystemen, de technieken en de eventuele issues die zich bij deze systemen kunnen voordoen. Deze kennis wordt ingezet om de parkeerder op locatie zo snel en adequaat mogelijk te helpen.",
  },
  {
    id: "4",
    title: "Duidelijke rapportages – voor optimaal beheer",
    text: "Wij rapporteren op maandelijkse basis de aangenomen gesprekken en uitgevoerde acties. Daarbij denken wij graag mee in de behoeften op het vlak van rapportages, signaleringen en communicatie, zodat de gewenste informatie tijdig bij de juiste stakeholders terecht komt.",
  },
];
export default function Benefits() {
  const [faq, setFaq] = useState(null);

  return (
    <section className={styles["benefits"]}>
      <div className="auto__container">
        <div className={styles["benefits__inner"]}>
          <div className={styles["benefits__inner-title"]}>
            <motion.h2 {...fadeInUp(0.2)}>
              Waarom kiezen voor Égards Parking Assistance?
            </motion.h2>
          </div>
          <div className={styles["benefits__inner-row"]}>
            <div className={styles["benefitsBanner"]}>
              <motion.img {...fadeIn(0.2)} src={banner} alt="" />
              <motion.div
                {...fadeInUp(0.3)}
                className={styles["benefitsBanner__card"]}
              >
                <h5>15 Jaar</h5>
                <p className="sm">Ervaring in Customer Service</p>
              </motion.div>
              <motion.div
                {...fadeInUp(0.5)}
                className={styles["benefitsBanner__card"]}
              >
                <h5>10 Jaar</h5>
                <p className="sm">Ervaring in Parking Management</p>
              </motion.div>
            </div>
            <div className={styles["benefitsContent"]}>
              {benefitsList.map((item, index) => {
                return (
                  <BenefitsItem
                    {...item}
                    key={index}
                    setFaq={setFaq}
                    faq={faq}
                    index={index}
                  />
                );
              })}
            </div>
            <motion.div {...fadeIn(0.5)} className={styles["benefitsShape"]}>
              <img src={shape} alt="" />
            </motion.div>
            <div className={styles["benefitsBlur"]}>
              <img src={blur} alt="" />
            </div>
          </div>
          <div className={styles["benefits__inner-foot"]}>
            <motion.h5 {...fadeInUp(0.7)}>
              Wilt u meer weten over hoe Égards Parking Assistance de dagelijkse
              praktijk van uw parkeerlocatie kan ondersteunen? Neem vandaag nog
              contact met ons op!
            </motion.h5>
            <motion.button
              {...fadeInUp(0.8)}
              type="button"
              className="button primary"
            >
              Neem contact op
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
const BenefitsItem = (props, faq) => {
  return (
    <motion.div
      {...fadeInUp(props.index * 0.2)}
      className={styles["benefitsItem"]}
    >
      <div
        className={classNames(
          styles["benefitsItem__head"],
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
        <h6>{props.title}</h6>
        <span className={props.faq === props.id ? styles["active"] : ""}></span>
      </div>
      <AnimatePresence>
        {props.faq === props.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, height: 0 }}
            className={styles["benefitsItem__body-outer"]}
          >
            <FadeIn className={styles["benefitsItem__body"]}>
              <p>{props.text}</p>
            </FadeIn>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
