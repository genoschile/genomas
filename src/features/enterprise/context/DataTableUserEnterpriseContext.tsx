"use client";

import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type User = {
  id: string;
  image: string;
  name: string;
  email: string;
  userType: string;
  role?: string;
  groups: string[];
  createdAt: Date;
  updatedAt: Date;
  isDefaultAdmin: boolean;
  _version?: number; // Para forzar re-renders
};

type TableContextType = {
  users: User[];
  selectedIds: string[];
  favoriteIds: string[];
  loading: boolean;
  toggleSelect: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addUsers: (newUsers: User[]) => void;
  removeUser: (id: string) => void;
  editUser: (id: string, updates: Partial<User>) => void;
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
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    console.log("Users state changed:", JSON.stringify(users, null, 2));
  }, [users]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const org = getLocalStorageOrganization();

        if (!org) {
          return;
        }

        const res = await fetch(routes.getUserFromOrganization(org));

        if (!res.ok) {
          toast.error("Error al obtener los usuarios");
        }

        const data = await res.json();
        // dentro de fetchUsers, después de obtener data
        const normalize = (u: any) => ({
          id: u.id,
          image: u.image ?? "",
          name: u.name ?? "",
          email: u.email ?? "",
          // asegurar que haya un campo role que la UI use
          role: u.role ?? u.userType ?? "",
          userType: u.userType ?? u.role ?? "",
          groups: u.groups ?? [],
          createdAt: u.createdAt ? new Date(u.createdAt) : undefined,
          updatedAt: u.updatedAt ? new Date(u.updatedAt) : undefined,
          isDefaultAdmin: !!u.isDefaultAdmin,
          _version: 0, // Inicializar versión
        });

        setUsers((data.data || []).map(normalize));
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        toast.error("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUsers = async (newUsers: User[]) => {
    const usersWithVersion = newUsers.map(u => ({ ...u, _version: 0 }));
    setUsers((prevUsers) => [...prevUsers, ...usersWithVersion]);
    setUpdateTrigger(prev => prev + 1);
  };

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

  const removeUser = (id: string) => {
    setUsers((prevUsers) => {
      const filtered = prevUsers.filter((user) => user.id !== id);
      console.log('🗑️ Removing user:', id, 'New count:', filtered.length);
      return filtered;
    });
    setUpdateTrigger(prev => prev + 1); // Fuerza re-render
  };

  const editUser = (userId: string, updates: Partial<User>) => {
    console.log('✏️ Editing user:', userId, 'Updates:', updates);
    setUsers((prevUsers) => {
      const newUsers = prevUsers.map((user) => {
        if (user.id !== userId) return user;

        const updated = {
          ...user,
          ...updates,
          role: updates.role ?? updates.userType ?? user.role,
          userType: updates.userType ?? updates.role ?? user.userType,
          _version: (user._version ?? 0) + 1, // Incrementa versión
        };
        
        console.log('✅ User updated:', { old: user, new: updated });
        return updated;
      });
      
      return [...newUsers]; // Nueva referencia de array
    });
    setUpdateTrigger(prev => prev + 1); // Fuerza re-render
  };

  return (
    <DataTableUserEnterpriseContext.Provider
      value={{
        addUsers,
        users,
        selectedIds,
        favoriteIds,
        toggleSelect,
        toggleFavorite,
        loading,
        removeUser,
        editUser,
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
