"use client"

import { deleteSession } from "@/lib/actions/session";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

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

      // userContext.({ name: null, isLogged: false, email: null, id: null });

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
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md text-black">
      <ul>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 w-full hover:bg-gray-200"
          >
            <FaSignOutAlt className="mr-2" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}
