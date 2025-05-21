import React, { createContext, useContext, useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const initialLanguage = localStorage.getItem("language") || "en";
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    localStorage.setItem("language", lang);

    enqueueSnackbar("Language updated successfully.", {
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });

    window.location.reload();
  };

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
