"use client";

import { deleteSession } from "@/lib/actions/session";
import { useRouter } from "next/navigation";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "./dropdownMenu.css"; // Importa el CSS

import { useRef } from "react";

export function DropdownMenu({
  setDropdownVisible,
  dropdownVisible,
  dropdownRef,
}: {
  dropdownVisible: boolean;
  setDropdownVisible: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLElement>;
}) {
  const router = useRouter();

  if (!dropdownVisible) {
    return null;
  }

  return (
    <nav
      aria-label="Menú de usuario"
      className="dropdownUser--menu"
      ref={dropdownRef}
    >
      <ul role="menu">
        <ItemMenu setDropdownVisible={setDropdownVisible} />
      </ul>
    </nav>
  );
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
    router.push("/profile"); // Reemplaza "/profile" con la ruta correcta
    setDropdownVisible(false); // Cierra el dropdown después de hacer clic
  };

  return (
    <>
      <li role="menuitem">
        <button onClick={handleProfile}>
          <FaUser className="dropdown-menu__icon" />
          Perfil
        </button>
      </li>
      <li role="menuitem">
        <button onClick={handleLogout}>
          <FaSignOutAlt className="dropdown-menu__icon" />
          Cerrar sesión
        </button>
      </li>
    </>
  );
};
