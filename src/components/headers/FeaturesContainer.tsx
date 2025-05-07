"use client";

import "./featuresContainer.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { usePathname } from "next/navigation";
import { I18nButton } from "./I18nButton";
import Logo from "../logo/Logo";

export default function FeaturesContainer() {
  const pathname = usePathname();
  return (
    <div
      className={`features-header__container ${
        pathname === "/login" || pathname === "/signup" ? "login--" : ""
      }`}
    >
      <Logo />
      <div>
        <ButtonPrimary text="Learn More" link="#" />
        <I18nButton />
      </div>
    </div>
  );
}
