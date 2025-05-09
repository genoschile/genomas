"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { FiHome, FiPaperclip, FiUser } from "react-icons/fi";

const routes = [
  { Icon: FiHome, title: "Overview", path: "/workspace/admin/overview" },
  { Icon: FiUser, title: "Users", path: "/workspace/admin/users" },
  { Icon: FiPaperclip, title: "Settings", path: "/workspace/admin/products" },
  { Icon: FiUser, title: "Users", path: "/workspace/admin/users" },
  { Icon: FiUser, title: "Contact", path: "/workspace/admin/contact" },
  { Icon: FiUser, title: "Patient", path: "/workspace/admin/patient" },
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
    <button
      onClick={handleClick}
      className={`${selected ? "button--selected" : "button--unselected"}`}
    >
      <Icon className={`${selected ? "icon--selected" : ""}`} />
      <span>{title}</span>
    </button>
  );
};
