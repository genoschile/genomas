"use client";

import { localStorageIdOrganization } from "@/lib/utils/localStorageIdOrganization";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
};

type TableContextType = {
  users: User[];
  selectedIds: string[];
  favoriteIds: string[];
  currentPage: number;
  postsPerPage: number;
  paginatedUsers: User[];
  loading: boolean;
  toggleSelect: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const DataTableUserEnterpriseContext = createContext<
  TableContextType | undefined
>(undefined);

export const DataTableUserEnterpriseProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const postsPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const org = localStorageIdOrganization();

        if (!org) {
          return 
        }

        const res = await fetch("/api/organization/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: org.id }),
        });

        if (!res.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await res.json();

        console.log("Usuarios obtenidos:", data);

        setUsers(data.data || []);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <DataTableUserEnterpriseContext.Provider
      value={{
        users,
        selectedIds,
        favoriteIds,
        currentPage,
        postsPerPage,
        paginatedUsers,
        toggleSelect,
        toggleFavorite,
        setCurrentPage,
        loading,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </DataTableUserEnterpriseContext.Provider>
  );
};

export const useDataTableUserEnterpriseContext = () => {
  const context = useContext(DataTableUserEnterpriseContext);
  if (!context) {
    throw new Error(
      "useTableEnterpriseUser must be used within a TableEnterpriseUserProvider"
    );
  }
  return context;
};
