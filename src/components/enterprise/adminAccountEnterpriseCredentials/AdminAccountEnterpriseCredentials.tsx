"use client";

import { FaRegCopy } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import "./adminAccountEnterpriseCredentials.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { useEffect, useState } from "react";

type Credentials = {
  email: string;
  password: string;
};

export const AdminAccountEnterpriseCredentials = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      const organizationId = getLocalStorageOrganization();
      if (!organizationId) {
        console.warn("No organizationId found in localStorage");
        return;
      }

      try {
        const res = await fetch(
          `/api/organization/${organizationId}/defaultAdmin`
        );
        if (!res.ok) throw new Error("Failed to fetch credentials");

        const data = await res.json();
        setCredentials(data);
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  console.log("credencials", credentials)

  return (
    <div className="admincredential--container">
      <header>
        <div>
          <h1>Genomas Innovations</h1>
          <IconRoundedFull icon={<VscAccount />} />
        </div>
        <small>Administrator access credentials for Genomas Innovation</small>
      </header>

      <figure>
        <img src="/images/carrousel/car1.svg" alt="" />
      </figure>

      {loading ? (
        <p>Cargando credenciales...</p>
      ) : credentials ? (
        <fieldset>
          <legend>credentials</legend>
          <div>
            <label>
              Correo
              <span>
                {credentials.email}
                <FaRegCopy />
              </span>
              <input type="text" value={credentials.email} readOnly />
            </label>

            <label>
              Password
              <div>
                <input type="password" placeholder="hola" value={credentials.password} readOnly />
                <span>{credentials.password}</span>
                <button>
                  <FaRegCopy />
                </button>
              </div>
            </label>
          </div>
        </fieldset>
      ) : (
        <p>No se pudieron cargar las credenciales.</p>
      )}

      <hr />

      <footer>
        <small>Ensure these credentials are stored securely.</small>
        <a>
          <MdManageAccounts /> Switch Session to User
        </a>
      </footer>
    </div>
  );
};
