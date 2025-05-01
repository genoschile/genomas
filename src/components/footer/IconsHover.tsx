import { JSX } from "react";
import "./iconsHover.css"

export function IconsHover({
  social,
  index,
}: {
  social: { icon: JSX.Element; href: string };
  index: number;
}) {
  return (
    <a className="icons--items" key={index} href={social.href}>
      {social.icon}
    </a>
  );
}
