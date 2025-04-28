"use client"

import FeaturesContainer from "./FeaturesContainer";
import "./featuresHeader.css";
import { I18nButton } from "./I18nButton";
import UserOptions from "./UserOptions";

export default function FeaturesHeader() {
  return (
    <header className="features-header">
      <FeaturesContainer />
      <UserOptions />
    </header>
  );
}
