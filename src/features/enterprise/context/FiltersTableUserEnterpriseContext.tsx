"use client";

import { createContext, useContext, useState } from "react";

const FiltersTableUserEnterpriseContext = createContext<{
  openId: string | null;
  toggleOpen: (id: string) => void;
  close: () => void;
}>({
  openId: null,
  toggleOpen: () => {},
  close: () => {},
});

export const FiltersTableUserEnterpriseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleOpen = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const close = () => setOpenId(null);

  return (
    <FiltersTableUserEnterpriseContext.Provider
      value={{ openId, toggleOpen, close }}
    >
      {children}
    </FiltersTableUserEnterpriseContext.Provider>
  );
};

export const useFiltersTableUserEnterpriseContext = () =>
  useContext(FiltersTableUserEnterpriseContext);
