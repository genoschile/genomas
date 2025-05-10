"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { FiHome, FiUser } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";
import { GiGlowingHands } from "react-icons/gi";

const routes = [
  { Icon: FiHome, title: "Home", path: "#" },
  { Icon: FiUser, title: "Users", path: "#" },
  { Icon: MdGroups2, title: "Groups", path: "#" },
  { Icon: GiGlowingHands, title: "AI Suggestions", path: "#" },
];

export function RouteSelect() {
  const pathname = usePathname();
  return (
    <ul>
      {routes.map(({ Icon, title, path }, index) => {
        const isSelected = pathname === path;
        return (
          <Route
            key={index}
            Icon={Icon}
            selected={isSelected}
            title={title}
            path={path}
          />
        );
      })}
    </ul>
  );
}

const Route = ({
  selected,
  Icon,
  title,
  path,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <li
      onClick={handleClick}
      className={`${selected ? "button--selected" : "button--unselected"}`}
    >
      <Icon className={`${selected ? "icon--selected" : ""}`} />
      <span>{title}</span>
    </li>
  );
};
