import { JSX } from "react";
import "./iconsHover.css";

export function IconsHover({
  social,
  index,
  color = "rgba(255, 255, 255, 0.9)",
}: {
  social: { icon: JSX.Element; href: string };
  index: number;
  color?: string;
}) {
  return (
    <a
      className="icons--items"
      style={{
        color: `${color}`,
        fill: `${color}`,
      }}
      key={index}
      href={social.href}
    >
      {social.icon}
    </a>
  );
}
