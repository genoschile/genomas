"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { toast } from "react-toastify";
import { deleteSession } from "@/lib/actions/session";

interface MenuItem {
  label: string;
  icon: JSX.Element;
  type: "button" | "link";
  onClick?: () => void;
  href?: string;
}

export const ItemMenu = ({
  setDropdownVisible,
}: {
  setDropdownVisible: (value: boolean) => void;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    

    const toastId = toast.loading("Cerrando sesión...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
    });

    try {
      await deleteSession();

      localStorage.removeItem("genomaUser");
      localStorage.removeItem("genomaAuth");

      toast.update(toastId, {
        render: "Sesión cerrada con éxito!",
        type: "success",
        closeOnClick: true,
        pauseOnHover: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.update(toastId, {
        render: "Error al cerrar sesión. Intenta nuevamente.",
        type: "error",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleProfile = () => {
    router.push("/profile");
    setDropdownVisible(false);
  };

  const menuItems: MenuItem[] = [
    {
      label: "Perfil",
      icon: <FaUser className="dropdown-menu__icon" />,
      type: "button",
      onClick: handleProfile,
    },
    {
      label: "Cerrar sesión",
      icon: <FaSignOutAlt className="dropdown-menu__icon" />,
      type: "button",
      onClick: handleLogout,
    },
    {
      label: "Config",
      icon: <IoIosSettings className="dropdown-menu__icon" />,
      type: "link",
      href: "#",
    },
  ];

  return (
    <ul role="menu">
      {menuItems.map((item, index) => (
        <li key={index} role="menuitem">
          {item.type === "button" ? (
            <button onClick={item.onClick}>
              {item.icon}
              {item.label}
            </button>
          ) : (
            <Link href={item.href || "#"}>
              {item.icon}
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
