"use client";

/* styles */
import "./footerLanding.css";

/* icons */
import { FaLinkedin } from "react-icons/fa";

/* components */
import ScrollToTopButton from "./ScrollToTopButton";
import { useTranslations } from "@/context/I18nClientProvider";
import { IconsHover } from "./IconsHover";

const socialIcons = [
  {
    icon: <FaLinkedin size={32} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={32} color="black" className="social-icons" />,
    href: "#",
  },
  {
    icon: <FaLinkedin size={32} color="black" className="social-icons" />,
    href: "#",
  },
];

export function FooterLanding({ className = "" }: { className?: string }) {
  const { t } = useTranslations();

  const currentText = {
    copyright: t("layout.copyright"),
    socialMedia: t("layout.footer.socialTitle"),
    textButton: t("layout.footer.buttonText"),
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input[name='inputText']");
  };

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer-container">
        <fieldset>
          <legend>{currentText.socialMedia}</legend>

          <div>
            <input name="inputText" type="text" />
            <label htmlFor="inputText">
              <strong>{t("layout.footer.inputPlaceholder")}</strong>
              <small>{t("layout.footer.inputPlaceholder.2")}</small>
            </label>
          </div>

          <button onClick={handleSubmit} type="submit">
            {currentText.textButton}
          </button>
        </fieldset>

        <div className="social">
          {socialIcons.map((social, index) => (
            <IconsHover key={index} social={social} index={index} />
          ))}
        </div>

        <small>© 2025 Genomas - {currentText.socialMedia}</small>

        <ScrollToTopButton />
      </div>
    </footer>
  );
}
