import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details (null if not logged in)
  const [receiver,setReceiver]= useState(null)
  
  const authContextValue = {
    user,
    setUser,
    setReceiver,
    receiver,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
