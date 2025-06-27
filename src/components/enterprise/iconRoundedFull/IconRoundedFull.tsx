import { JSX } from "react";
import "./iconRoundedFull.css";

type IconRoundedFullProps = {
  icon: JSX.Element;
};

export function IconRoundedFull({ icon }: IconRoundedFullProps) {
  return <span className="icon-rounded-full">{icon}</span>;
}
