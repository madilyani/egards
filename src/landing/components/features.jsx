import styles from "../landing.module.scss";
import banner from "@/assets/images/features/banner.webp";
import icon1 from "@/assets/images/features/1.webp";
import icon2 from "@/assets/images/features/2.webp";
import icon3 from "@/assets/images/features/3.webp";
import { motion } from "framer-motion";
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
const featuresList = [
  {
    id: "1",
    icon: icon1,
    title: "Exploitanten",
    text: "Een efficiënte en rendabele parkeerlocatie begint bij een soepel werkend systeem. Met snelle en effectieve probleemoplossing worden operationele kosten verlaagd, zonder directe fysieke interventie. Daarnaast ontvangt u maandelijkse rapportages voor inzicht in prestaties en incidenten binnen uw parkeerfaciliteit.",
  },
  {
    id: "2",
    icon: icon2,
    title: "Beheerders",
    text: "Beheert u een parkeerfaciliteit? Dan wilt u een professionele afhandeling van intercom- en telefoonoproepen, correcte aansturing van de technische dienst, huismeesters en beveiligers, en begeleiding van parkeerders waar nodig. Zo kunt u zich richten op het optimaliseren van de parkeerervaring voor de eindgebruiker.",
  },
  {
    id: "3",
    icon: icon3,
    title: "Leveranciers van parkeersystemen en - applicaties",
    text: "Een parkeersysteem leveren is één ding, maar 24/7 ondersteuning blijft een uitdaging. Dankzij onze diepgaande kennis van parkeersystemen kunnen storingen snel en accuraat worden opgelost. Dit draagt bij aan een sterke reputatie als betrouwbare leverancier en verhoogt de klanttevredenheid.",
  },
];
export default function Features() {
  return (
    <section className={styles["features"]}>
      <div className="auto__container">
        <div className={styles["features__inner"]}>
          <motion.div
            {...fadeInUp(0.1)}
            className={styles["features__inner-title"]}
          >
            <h2>Voor wie is Égards Parking Assistance?</h2>
          </motion.div>
          <div className={styles["featuresBanner"]}>
            <img src={banner} alt="" />
          </div>
          <div className={styles["featuresMain"]}>
            {featuresList.map((item, index) => {
              return <FeaturesItem {...item} key={index} index={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export const FeaturesItem = (props) => {
  return (
    <motion.div
      {...fadeInUp(props.index * 0.2)}
      className={styles["featuresItem"]}
    >
      <div className={styles["featuresItem__icon"]}>
        <img src={props.icon} alt="" />
      </div>
      <h5>{props.title}</h5>
      <p>{props.text}</p>
    </motion.div>
  );
};
