"use client";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./style.css";
import { useEffect, useState } from "react";

type Organization = {
  id: string;
  name: string;
  email: string;
};

export default function Page() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar organizaciones desde la API
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/organization", { cache: "no-store" });
        const json = await res.json();
        setOrganizations(json.data || []);
      } catch (error) {
        console.error("Error al cargar organizaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Eliminar organización
  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta organización?")) return;

    try {
      const res = await fetch(`/api/organization/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrganizations((prev) => prev.filter((org) => org.id !== id));
      } else {
        console.error("Error al eliminar organización");
      }
    } catch (error) {
      console.error("Error en la eliminación:", error);
    }
  };

  // Editar organización
  const handleEdit = (id: string) => {
    alert(`Editar organización con ID: ${id}`);
    // Aquí puedes abrir un modal o redirigir a /admin/organizations/edit/[id]
  };

  if (loading) {
    return <p className="text-gray-500">Cargando organizaciones...</p>;
  }

  return (
    <div className="org-container">
      <h1 className="org-title">Mantenedor de Organizaciones</h1>

      {organizations.length === 0 ? (
        <p className="org-empty">No hay organizaciones registradas.</p>
      ) : (
        <div className="org-list">
          {organizations.map((org) => (
            <div key={org.id} className="org-card">
              {/* Información de la organización */}
              <div>
                <h2 className="org-name">{org.name}</h2>
                <p className="org-email">{org.email}</p>
              </div>

              {/* Botones de acción */}
              <div className="org-actions">
                <button
                  onClick={() => handleEdit(org.id)}
                  className="org-edit-btn"
                >
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => handleDelete(org.id)}
                  className="org-delete-btn"
                >
                  <FaTrashAlt /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
