import icon1 from "@/assets/images/services/1.svg";
import icon2 from "@/assets/images/services/2.svg";
import icon3 from "@/assets/images/services/3.svg";
import icon4 from "@/assets/images/services/4.svg";
import icon5 from "@/assets/images/services/5.svg";
import blur from "@/assets/images/services/blur.svg";
import { motion } from "framer-motion";
import styles from "../landing.module.scss";
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay },
  },
});
const servicesList = [
  {
    id: "1",
    icon: icon1,
    title: "24/7 Assistentie & Communicatie",
    list: [
      "Directe afhandeling van intercom- en telefoongesprekken",
      "Proactieve ondersteuning en begeleiding van parkeerders",
      "Deskundige medewerkers met parkeervakexpertise",
    ],
  },
  {
    id: "2",
    icon: icon2,
    title: "Operationele Controle & Systeembeheer",
    list: [
      "Controle en aansturing van in- en uitritten",
      "Resetten van betaalautomaten",
      "Beoordelen en oplossen van anti-passback situaties",
    ],
  },

  {
    id: "3",
    icon: icon3,
    title: "Monitoren & Rapportage",
    list: [
      "Monitoren van transactielogs, foutmeldingen en toegangslogs",
      "Incident- en storingsrapportages om patronen te signaleren",
      "Directe actie op urgente problemen",
    ],
  },
  {
    id: "4",
    icon: icon4,
    title: "Communicatie & Coördinatie bij Storingen",
    list: [
      "Aansturing van technische dienst voor reparaties",
      "Informeren van parkinghosts en beheerders",
      "Doorgeven van urgente meldingen aan beveiligers",
    ],
  },
  {
    id: "5",
    icon: icon5,
    title: "Service & Klantgerichtheid",
    list: [
      "Op maat gemaakte protocollen afgestemd op uw locatie",
      "Rapportage op basis van de gewenste frequentie (dagelijks/wekelijks/maandelijks)",
      "Transparante kostenstructuur",
    ],
  },
];
export default function Services() {
  return (
    <section className={styles["services"]}>
      <div className="auto__container">
        <div className={styles["services__inner"]}>
          <div className={styles["services__inner-title"]}>
            <motion.h2 {...fadeInUp(0.2)}>Services</motion.h2>
            <motion.p {...fadeInUp(0.3)}>
              Hoe helpt Parking Assistance uw organisatie?
            </motion.p>
          </div>
          <div className={styles["services__inner-wrapper"]}>
            <div className={styles["servicesBlur"]}>
              <img src={blur} alt="" />
            </div>
            <div className={styles["services__inner-row"]}>
              {servicesList.map((item, index) => {
                return <ServicesItem {...item} key={index} index={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const ServicesItem = (props) => {
  return (
    <div className={styles["servicesItem"]}>
      <div className={styles["servicesItem__icon"]}>
        <img src={props.icon} alt="" />
      </div>
      <h5>{props.title}</h5>
      <ul>
        {props.list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
};
