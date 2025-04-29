"use client";

import FeaturesContainer from "./FeaturesContainer";
import "./featuresHeader.css";
import UserOptions from "./UserOptions";

export default function FeaturesHeader() {
  return (
    <header className="features-header">
      <FeaturesContainer />
      <UserOptions />
    </header>
  );
}
