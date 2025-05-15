import styles from "./header.module.scss";
import logo from "@/assets/images/logo.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { globeIcon } from "../SVG";
import en from "@/assets/images/icons/en.webp";
import nl from "@/assets/images/icons/nl.webp";
import de from "@/assets/images/icons/de.webp";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  const languages = [
    { code: "EN", icon: en, name: "English" },
    { code: "NL", icon: nl, name: "Dutch" },
    { code: "DE", icon: de, name: "German" },
  ];
  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setShowLangMenu(false);
  };
  useEffect(() => {
    if (menu) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [menu]);
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
    document.body.classList.remove("active");
  }, [location]);
  const close = (e) => {
    if (e.target === e.currentTarget) setMenu(false);
  };
  useEffect(() => {
    function scrollFunc() {
      if (window.scrollY >= 60) {
        setIsSticky(true);
      } else setIsSticky(false);
    }
    window.addEventListener("scroll", function () {
      scrollFunc();
    });
    return () => {
      window.removeEventListener("scroll", function () {
        scrollFunc();
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".anchor");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={classNames(
        styles["header"],
        isSticky && styles["sticky"],
        menu && styles["active"]
      )}
    >
      <div className="auto__container">
        <div className={styles["header__inner"]}>
          <Link href="/" className={styles["header__inner-logo"]}>
            <img src={logo} alt="" />
          </Link>
          <nav
            className={classNames(styles["nav"], menu && styles["active"])}
            onClick={close}
          >
            <div className={styles["nav__inner"]}>
              <div className={styles["nav__inner-links"]}>
                <li>
                  <a
                    aria-label="Navigate Home"
                    href="#home"
                    className={classNames(
                      "anchorLinks",
                      activeLink === "home" && "active"
                    )}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Over Ons"
                    href="#about"
                    className={classNames(
                      "anchorLinks",
                      activeLink === "about" && "active"
                    )}
                  >
                    Over Ons
                  </a>
                </li>
                <li>
                  <a
                    aria-label="Diensten"
                    href="#services"
                    className={classNames(
                      "anchorLinks",
                      activeLink === "services" && "active"
                    )}
                  >
                    Diensten
                  </a>
                </li>
              </div>
              <div className={styles["nav__inner-buttons"]}>
                <div className={styles["lang"]}>
                  <button
                    aria-label="Language"
                    type="button"
                    className={styles["lang__btn"]}
                    onClick={() => setShowLangMenu(!showLangMenu)}
                  >
                    {selectedLang ? (
                      <>
                        <span>
                          <img
                            src={selectedLang.icon}
                            alt={selectedLang.code}
                          />
                        </span>
                        <p>{selectedLang.name}</p>
                      </>
                    ) : (
                      <>
                        <span>{globeIcon}</span>
                        <p>Talen</p>
                      </>
                    )}
                  </button>
                  <AnimatePresence>
                    {showLangMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className={styles["lang__menu"]}
                      >
                        {languages.map((lang) => (
                          <div
                            key={lang.code}
                            className={styles["lang__item"]}
                            onClick={() => handleLangSelect(lang)}
                          >
                            <b>{lang.code}</b>
                            <span>
                              <img src={lang.icon} alt={lang.code} />
                            </span>
                            <p>{lang.name}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* <div className={styles["lang"]}>
                  <button type="button" className={styles["lang__btn"]}>
                    <span>{globeIcon}</span>
                    <p>Talen</p>
                  </button>
                  <div className={styles["lang__menu"]}>
                    <div className={styles["lang__item"]}>
                      <b>EN</b>
                      <span>
                        <img src={en} alt="" />
                      </span>
                      <p>English</p>
                    </div>
                    <div className={styles["lang__item"]}>
                      <b>NL</b>
                      <span>
                        <img src={nl} alt="" />
                      </span>
                      <p>Dutch</p>
                    </div>
                    <div className={styles["lang__item"]}>
                      <b>DE</b>
                      <span>
                        <img src={de} alt="" />
                      </span>
                      <p>German</p>
                    </div>
                  </div>
                </div> */}
                <a
                  aria-label="Contact"
                  href="#contact"
                  className={classNames(
                    "button primary anchorLinks",
                    activeLink === "contact" && "active"
                  )}
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
          <div
            className={classNames(styles["burger"], menu && styles["active"])}
            id="menuBtn"
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
