"use client";

import "./featuresContainer.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { usePathname } from "next/navigation";

export default function FeaturesContainer() {
  const pathname = usePathname();
  return (
    <div
      className={`features-header__container ${
        pathname === "/login" ? "login--" : ""
      }`}
    >
      <p className="features-header__title">New Features on GENOMAS</p>
      <ButtonPrimary text="Learn More" link="#" />
    </div>
  );
}
