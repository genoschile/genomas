"use client";

import { deleteSession } from "@/lib/actions/session";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./dropdownMenu.css"; // Importa el CSS

export default function DropdownMenu() {
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

  return (
    <div className="dropdown-menu">
      <ul className="dropdown-menu__list">
        <li className="dropdown-menu__item">
          <button className="dropdown-menu__button" onClick={handleLogout}>
            <FaSignOutAlt className="dropdown-menu__icon" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}
