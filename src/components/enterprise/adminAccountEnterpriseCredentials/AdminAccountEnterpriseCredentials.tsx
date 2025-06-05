"use client";

import { FaRegCopy } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import "./adminAccountEnterpriseCredentials.css";
import { IconRoundedFull } from "../iconRoundedFull/IconRoundedFull";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@/hooks/useSession";
import { get } from "http";

type Credentials = {
  email: string;
  password: string;
};

type AdminCredentialsResponse = {
  success: boolean;
  message: string;
  data: {
    email: string;
    name: string;
    id: string;
    organizationId: string;
  };
};

export const AdminAccountEnterpriseCredentials = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [loading, setLoading] = useState(true);

  const { clearOrganization, updateUser } = useSessionContext();

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

        const result = await res.json();
        const { email, encryptedPassword } = result.data;

        setCredentials({
          email,
          password: encryptedPassword,
        });
      } catch (error) {
        console.error("Error fetching credentials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCredentials();
  }, []);

  const handleCopyPassword = () => {
    if (credentials) {
      navigator.clipboard.writeText(credentials.password);
      alert("Password copied to clipboard!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Switching session to user...");

    fetch("/api/users/defaultAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    })
      .then((res) => res.json())
      .then((data: AdminCredentialsResponse) => {
        if (data.success) {
          console.log("Session switched successfully:", data);

          updateUser({
            email: data.data.email,
            name: data.data.name,
            id: data.data.id,
            organizationId: data.data.organizationId,
          });

          clearOrganization();

          router.push("/genomas/user");
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error switching session:", error);
        alert("Failed to switch session. Please try again.");
      });
  };

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
        <form id="admin-credentials-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>credentials</legend>
            <div>
              <label>
                Correo
                <input type="text" value={credentials.email} readOnly />
              </label>

              <label>
                Password
                <div>
                  <input
                    type="password"
                    value={credentials.password}
                    readOnly
                  />
                  <button type="button" onClick={handleCopyPassword}>
                    <FaRegCopy />
                  </button>
                </div>
              </label>
            </div>
          </fieldset>
        </form>
      ) : (
        <p>No se pudieron cargar las credenciales.</p>
      )}

      <hr />

      <footer>
        <small>Ensure these credentials are stored securely.</small>
        <button form="admin-credentials-form" type="submit">
          <MdManageAccounts /> Switch Session to User
        </button>
      </footer>
    </div>
  );
};
