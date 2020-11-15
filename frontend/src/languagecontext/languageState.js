import React, { useState } from "react";
import languages from "../languages";

export const langcontext = React.createContext();

const LanguageState = ({ children }) => {
  const locallang = localStorage.getItem("language");
  const [language, setLanguage] = useState(
    languages[locallang] || languages.english
  );

  const changeLanguage = (mylanguage) => {
    setLanguage(languages[mylanguage]);
    localStorage.setItem("language", mylanguage);
  };

  return (
    <langcontext.Provider value={{ changeLanguage, language }}>
      {children}
    </langcontext.Provider>
  );
};

export default LanguageState;
