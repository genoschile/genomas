"use client";

import { useState } from "react";
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";
import { useSessionContext } from "@/features/auth/hooks/useSession";
import "./settings.css";
import {
  FaSave,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function SettingsPage() {
  const { organization } = useSessionContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: organization?.name || "",
    email: organization?.email || "",
    phone: organization?.phone || "",
    address: organization?.address || "",
    website: organization?.website || "",
    description: organization?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar API call para actualizar organización
    toast.success("Configuración guardada exitosamente");
    setIsEditing(false);
  };

  return (
    <div className="enterprise-settings">
      <ChatSuggestionTitle
        title="Configuración de la Organización"
        description="Administra la información y configuración de tu organización."
      />

      <ContainerDefaultEnterprise dinamicStyle="settings-content">
        <div className="settings-header">
          <h2>Información General</h2>
          {!isEditing ? (
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              Editar
            </button>
          ) : (
            <button
              className="btn-cancel"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: organization?.name || "",
                  email: organization?.email || "",
                  phone: organization?.phone || "",
                  address: organization?.address || "",
                  website: organization?.website || "",
                  description: organization?.description || "",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">
                <FaBuilding />
                Nombre de la Organización
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">
                <FaEnvelope />
                Email de Contacto
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="phone">
                <FaPhone />
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div className="form-field">
              <label htmlFor="website">
                <FaGlobe />
                Sitio Web
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="https://ejemplo.com"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="address">
                <FaMapMarkerAlt />
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Calle, Ciudad, País"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                placeholder="Describe tu organización..."
              />
            </div>
          </div>

          {isEditing && (
            <button type="submit" className="btn-save">
              <FaSave />
              Guardar Cambios
            </button>
          )}
        </form>
      </ContainerDefaultEnterprise>

      <ContainerDefaultEnterprise dinamicStyle="settings-danger-zone">
        <h2>Zona Peligrosa</h2>
        <p className="danger-description">
          Acciones irreversibles que afectan permanentemente tu organización.
        </p>
        <button className="btn-danger">Eliminar Organización</button>
      </ContainerDefaultEnterprise>
    </div>
  );
}
