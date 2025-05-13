import { JSX } from "react";
import "./iconRoundedFull.css";
import { IconType } from "react-icons";

type IconRoundedFullProps = {
  icon: JSX.Element;
};

export function IconRoundedFull({ icon }: IconRoundedFullProps) {
  return <span className="icon-rounded-full">{icon}</span>;
}
