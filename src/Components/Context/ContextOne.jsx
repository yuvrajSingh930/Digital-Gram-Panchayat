import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const ContextOne = createContext();

const ContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const value = { searchQuery, setSearchQuery };

  return <ContextOne.Provider value={value}>{children}</ContextOne.Provider>;
};

export { ContextOne, ContextProvider };
// _____  _  __
// / ____|| |/ /
// | (___  | ' /
//  \___ \ |  <
//  ____) || . \
// |_____/ |_|\_\

// 👨‍💻 web site Created by Amir Sohail Sheikh
