import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [user, setUser] = useState('4444d');
  const [bearerToken, setBeaberToken] = useState(null);
   
  return (
    <DataContext.Provider value={{ user, setUser, bearerToken, setBeaberToken }}>
      {children}
    </DataContext.Provider>
  ); 
}; 
