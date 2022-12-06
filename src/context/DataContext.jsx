import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [user, setUser] = useState('4444d');
   
  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
      {user}
    </DataContext.Provider>
  ); 
}; 
