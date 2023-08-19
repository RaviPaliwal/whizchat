import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    ID: null,
    Token: null,
  }); // Store user details (null if not logged in)
  const [receiver, setReceiver] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);

  const authContextValue = {
    user,
    loggedIn,
    setUser,
    setReceiver,
    setloggedIn,
    receiver,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
