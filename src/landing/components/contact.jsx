import { locationIcon, mailIcon } from "../../base/SVG";
import styles from "../landing.module.scss";
import { motion } from "framer-motion";
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay },
  },
});
export default function Contact() {
  return (
    <section className={styles["contact"]}>
      <div className="auto__container">
        <div className={styles["contact__inner"]}>
          <div className={styles["contact__inner-row"]}>
            <div className={styles["contactContent"]}>
              <div className={styles["contactContent__title"]}>
                <motion.h3 {...fadeInUp(0.1)} >We spreken je graag.</motion.h3>
                <motion.p {...fadeInUp(0.2)} >
                  Heb je vragen of ben je benieuwd naar de mogelijkheden? Neem
                  gerust contact op met ons. Wij staan voor je klaar!
                </motion.p>
              </div>
              <div className={styles["contactContent__col"]}>
                <motion.a {...fadeInUp(0.3)} 
                  href="mailto:info@egards.nl"
                  className={styles["contactItem"]}
                >
                  <div className={styles["contactItem__icon"]}>{mailIcon}</div>
                  <div className={styles["contactItem__info"]}>
                    <h6>Email</h6>
                    <p>info@egards.nl</p>
                  </div>
                </motion.a>
                <motion.a {...fadeInUp(0.4)}  href="tel:+31 85 0832100" className={styles["contactItem"]}>
                  <div className={styles["contactItem__icon"]}>{mailIcon}</div>
                  <div className={styles["contactItem__info"]}>
                    <h6>Telefoon nr.</h6>
                    <p>+31 85 0832100</p>
                  </div>
                </motion.a>
                <motion.a {...fadeInUp(0.5)}  href="https://maps.app.goo.gl/G3tFqmxy5nd4K2v1A" target="_blank" className={styles["contactItem"]}>
                  <div className={styles["contactItem__icon"]}>
                    {locationIcon}
                  </div>
                  <div className={styles["contactItem__info"]}>
                    <h6>Adres</h6>
                    <p>Ds. Kuypersstraat 16T, 3863 CA Nijkerk</p>
                  </div>
                </motion.a>
              </div>
            </div>
            <div className={styles["contactForm"]}>
              <div className={styles["contactForm__row"]}>
                <motion.div {...fadeInUp(0.1)} className={styles["input__outer"]}>
                  <p>Naam</p>
                  <div className={styles["input"]}>
                    <input type="text" placeholder="Volledige naam" />
                  </div>
                </motion.div>
                <motion.div {...fadeInUp(0.2)} className={styles["input__outer"]}>
                  <p>Bedrijfsnaam</p>
                  <div className={styles["input"]}>
                    <input type="text" placeholder="Bedrijfsnaam" />
                  </div>
                </motion.div>
                <motion.div {...fadeInUp(0.3)} className={styles["input__outer"]}>
                  <p>Email</p>
                  <div className={styles["input"]}>
                    <input type="email" placeholder="Email adres" />
                  </div>
                </motion.div>
                <motion.div {...fadeInUp(0.4)} className={styles["input__outer"]}>
                  <p>Telefoon nr.</p>
                  <div className={styles["input"]}>
                    <input type="tel" placeholder="eg. (+1) 1234 5678 9012" />
                  </div>
                </motion.div>
                <motion.div {...fadeInUp(0.5)} className={styles["input__outer"]}>
                  <p>Bericht</p>
                  <div className={styles["input"]}>
                    <textarea
                      name=""
                      id=""
                      placeholder="Zet uw bericht hier"
                      rows={5}
                    ></textarea>
                  </div>
                </motion.div>
              </div>
              <div className={styles["contactForm__foot"]}>
                <motion.button {...fadeInUp(0.5)} type="submit" className="button primary">
                  Stuur bericht
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
