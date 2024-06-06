import { createContext, useContext, useState } from "react";

const CompCommunicate = createContext();

export const CompCommunicateProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <CompCommunicate.Provider
      value={{
        open,
        setOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CompCommunicate.Provider>
  );
};

export const useCompCommunicator = () => {
  return useContext(CompCommunicate);
};

