"use client";

import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import Link from "next/link";

import { FiHome, FiUser } from "react-icons/fi";
import { MdGroups2 } from "react-icons/md";
import { GiGlowingHands } from "react-icons/gi";

import "./routeSelect.css";

const pathNameBase = "/enterprise";
const adminPathBase = "/admin";

const ROUTES_BY_ROLE = {
  user: [
    { Icon: FiHome, title: "Home", path: pathNameBase },
    { Icon: FiUser, title: "Info", path: `${pathNameBase}/info` },
    {
      Icon: GiGlowingHands,
      title: "AI Suggestions",
      path: `${pathNameBase}/suggestions2`,
    },
  ],
  admin: [{ Icon: FiHome, title: "Organization", path: pathNameBase }],
  "super-admin": [
    { Icon: FiHome, title: "Organizations", path: adminPathBase },
    { Icon: FiUser, title: "All Users", path: `${adminPathBase}/users` },
    { Icon: MdGroups2, title: "All Groups", path: `${adminPathBase}/groups` },
  ],
} as const;

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

export function RouteSelect({ role }: { role?: "super-admin" | "admin" | "user" }) {
  const pathname = usePathname();

  const routes = role ? ROUTES_BY_ROLE[role] : ROUTES_BY_ROLE.user;

  return (
    <div className="sidebar-org--routecontainer">
      <ul>
        {routes.map(({ Icon, title, path }, index) => {
          const isHome = path === "/enterprise" || path === "/admin";
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
