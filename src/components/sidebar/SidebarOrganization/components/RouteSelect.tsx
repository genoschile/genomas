"use client";

import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import Link from "next/link";

import { FiHome, FiUser } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";
import { GiGlowingHands } from "react-icons/gi";

import "./routeSelect.css";

const pathNameBase = "/genomas/enterprise";

const routes = [
  { Icon: FiHome, title: "Home", path: pathNameBase },
  { Icon: FiUser, title: "Users", path: `${pathNameBase}/users` },
  { Icon: MdGroups2, title: "Groups", path: `${pathNameBase}/groups` },
  {
    Icon: FiHome,
    title: "Project",
    path: `${pathNameBase}/projects`,
  },
  {
    Icon: FiHome,
    title: "Workspaces",
    path: `${pathNameBase}/workspaces`,
  },
  {
    Icon: GiGlowingHands,
    title: "AI Suggestions",
    path: `${pathNameBase}/suggestions2`,
  },
];

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
  return (
    <li>
      <Link href={path} className={selected ? "button--selected" : ""}>
        <Icon className={selected ? "icon--selected" : ""} />
        {title}
      </Link>
    </li>
  );
};

export function RouteSelect() {
  const pathname = usePathname();

  return (
    <div className="sidebar-org--routecontainer">
      <ul>
        {routes.map(({ Icon, title, path }, index) => {
          const isHome = path === pathNameBase;
          const isSelected = isHome
            ? pathname === path
            : pathname === path || pathname.startsWith(path + "/");

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
    </div>
  );
}
