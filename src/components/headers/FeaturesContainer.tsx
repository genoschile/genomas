"use client";

import "./featuresContainer.css";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { usePathname } from "next/navigation";
import { I18nButton } from "@/features/lang/components/I18nButton";


export default function FeaturesContainer() {
  const pathname = usePathname();
  return (
    <div
      className={`features-header__container ${
        pathname === "/login" || pathname === "/signup" ? "login--" : ""
      }`}
    >
      <div>
        <ButtonPrimary text="Learn More" link="#" />
        <I18nButton />
      </div>
    </div>
  );
}
