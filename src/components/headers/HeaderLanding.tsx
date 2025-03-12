"use client";

import { useEffect, useState } from "react";
import "./HeaderLanding.css";

const Header = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrolling(currentScrollY > 50);
        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        const sideMenuCheckbox = document.getElementById(
          "side-menu"
        ) as HTMLInputElement;
        if (sideMenuCheckbox && sideMenuCheckbox.checked) {
          sideMenuCheckbox.checked = false;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`header-landing ${scrolling ? "scrolled" : ""}`}>
      <div className="header-landing__container">
        <a className="header-landing__brand" href="#">
          Genomas
        </a>

        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>

        <nav className="header-landing__nav">
          <a href="#" className="header-landing__link">
            Company
          </a>
          <a href="#" className="header-landing__link">
            Services
          </a>
          <a href="#" className="header-landing__link">
            Resources
          </a>
          <div className="header-landing__auth">
            <a href="/login" className="header-landing__auth-link">
              Login
            </a>
            <a href="#" className="header-landing__auth-signup">
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
