import styles from "./header.module.scss";
import logo from "@/assets/images/logo.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

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
    const windowScroll = () => {
      const links = document.querySelectorAll(".anchorLinks");

      const sections = document.querySelectorAll(".anchor");
      let index = sections.length;

      while (--index && window.scrollY + 100 < sections[index].offsetTop) {
        return;
      }

      links.forEach((link) => link.classList.remove("active"));
      links[index]?.classList.add("active");
    };
    windowScroll();
    window.addEventListener("scroll", windowScroll);
    return () => window.removeEventListener("scroll", windowScroll);
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
                  <a href="#home" className="anchorLinks active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="anchorLinks">
                    Over Ons
                  </a>
                </li>
                <li>
                  <a href="#services" className="anchorLinks">
                    Diensten
                  </a>
                </li>
              </div>
              <div className={styles["nav__inner-buttons"]}>
                <a href="#contact" className="button primary anchorLinks">
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
