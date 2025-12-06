"use client";

import "./style.css";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { ContainerDefaultEnterprise } from "../../../../../../features/enterprise/components/ContainerDefaultEnterprise";
import { ContainerSearch } from "../../../../../../features/admin/components/SearchOrganization";

type Organization = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export default function Page() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

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

  const handleEdit = (id: string) => {
    alert(`Editar organización con ID: ${id}`);
  };

  return (
    <div className="org-container">
      <ChatSuggestionTitle
        title="Administra Organizaciones"
        description="Puedes agregar, editar y eliminar organizaciones."
      />

      {loading ? (
        <ContainerDefaultEnterprise>
          <p>Cargando organizaciones...</p>
        </ContainerDefaultEnterprise>
      ) : (
        <>
          <ContainerDefaultEnterprise dinamicStyle="enterprise-groups__hero">
            <ContainerSearch
              onSearchChange={handleSearchChange}
              searchTerm={searchTerm}
            />
          </ContainerDefaultEnterprise>

          <ContainerDefaultEnterprise>
            {organizations.length === 0 ? (
              <p className="org-empty">No hay organizaciones registradas.</p>
            ) : (
              <div className="org-list">
                {organizations.map((org) => (
                  <div key={org.id} className="org-card">
                    <div>
                      <h2 className="org-name">{org.name}</h2>
                      <p className="org-email">{org.email}</p>
                    </div>

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
          </ContainerDefaultEnterprise>
        </>
      )}
    </div>
  );
}
