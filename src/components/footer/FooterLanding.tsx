"use client";

/* styles */
import "./footerLanding.css";

/* icons */
import { FaLinkedin } from "react-icons/fa";

/* components */
import ScrollToTopButton from "./ScrollToTopButton";

const socialIcons = [
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={24} color="black" className="social-icons" />,
    href: "#",
  },
];

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer-container">
        <div
          className="social-container"
          role="navigation"
          aria-labelledby="social-heading"
        >
          <h3 id="social-heading" className="sr-only">
            Follow us on social media
          </h3>
          <div className="social">
            {socialIcons.map((social, index) => (
              <a key={index} href={social.href}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <hr className="footer-break" />

        <p className="copyright">© 2025 Genomas - Some Rights Reserved</p>

        <ScrollToTopButton />
      </div>
    </footer>
  );
}
