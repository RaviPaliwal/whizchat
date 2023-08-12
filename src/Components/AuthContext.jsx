import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [authToken, setAuthToken] = useState("");
  // Add other important user details as needed

  const login = (name, token) => {
    setUserName(name);
    setAuthToken(token);
  };

  const logout = () => {
    setUserName("");
    setAuthToken("");
  };

  const authContextValue = {
    userName,
    authToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
