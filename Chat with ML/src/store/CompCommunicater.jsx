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

export const signupwithemailandPassword = async ({ FormData }) => {
  try {
    const result = await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FormData),
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
