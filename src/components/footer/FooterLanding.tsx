"use client";

import "./footerLanding.css";
import { FaLinkedin } from "react-icons/fa";
import ScrollToTopButton from "./ScrollToTopButton";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div
        className="social-container"
        role="navigation"
        aria-labelledby="social-heading"
      >
        <h3 id="social-heading" className="sr-only">
          Follow us on social media
        </h3>
        <div className="social">
          <a href="#">
            <FaLinkedin size={24} color="black" />
          </a>
          <a href="#">
            <FaLinkedin size={24} color="black" />
          </a>
          <a href="#">
            <FaLinkedin size={24} color="black" />
          </a>
        </div>
      </div>

      <hr className="footer-break" />

      <p className="copyright">© 2025 Demo of a footer. Some Rights Reserved</p>

      <ScrollToTopButton />
    </footer>
  );
}
