"use client";

import "./HeaderLanding.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import Logo from "@components/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Company",
    href: "#",
    isNextLink: false,
  },
  {
    label: "Services",
    href: "#",
    isNextLink: false,
  },
  {
    label: "Resources",
    href: "#",
    isNextLink: false,
  },
  {
    label: "Contact",
    href: "/contact",
    isNextLink: true,
  },
  {
    label: "Pipelines",
    href: "/pipe",
    isNextLink: true,
  }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={`header-landing `}>
      <div className="header-landing__container">
        <Logo />

        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>

        <nav className="header-landing__nav">
          {links.map(({ label, href, isNextLink }, index) => {
            const isActive = pathname.startsWith(href) && href !== "#";

            const linkClass = `header-landing__link ${isActive ? "active" : ""}
             ${!isNextLink ? "disabled" : ""}
            `;

            return isNextLink ? (
              <Link key={index} href={href} className={linkClass}>
                {label}
              </Link>
            ) : (
              <a key={index} href={href} className={linkClass}>
                {label}
              </a>
            );
          })}
          <div className="header-landing__auth">
            <ButtonPrimary
              link="/login"
              text="Login"
              className="header-landing__auth-link"
            />
            <ButtonPrimary text="Sign up" link="/organization/signup" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
