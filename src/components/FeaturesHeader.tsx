import ButtonPrimary from "./buttons/ButtonPrimary";
import "./featuresHeader.css"

export default function FeaturesHeader() {
  return (
    <header className="features-header">
      <div className="features-header__container">
        <p className="features-header__title">New Features on GENOMAS</p>
        <ButtonPrimary text="Learn More" link="#"  />
      </div>
    </header>
  );
}
