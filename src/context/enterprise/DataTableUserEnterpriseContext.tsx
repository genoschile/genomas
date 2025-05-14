"use client";

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

const mockUsersFromAPI: User[] = [
  {
    id: "1",
    image: "https://example.com/image1.jpg",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    groups: ["Group 1", "Group 2"],
  },
  {
    id: "2",
    image: "https://example.com/image2.jpg",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    groups: ["Group A"],
  },
  {
    id: "3",
    image: "https://example.com/image3.jpg",
    name: "Carlos Pérez",
    email: "carlos@example.com",
    role: "Editor",
    groups: ["Group 1", "Group 3"],
  },
];

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

  const postsPerPage = 2;

  useEffect(() => {
    setLoading(true);
    const fetchUsers = () => {
      setTimeout(() => {
        setUsers(mockUsersFromAPI);
        setLoading(false);
      }, 2000);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    return [user.name, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

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
