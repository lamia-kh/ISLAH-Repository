"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext(null);

// Export the context so it can be used by other components
export default AuthContext;

// Create a custom hook for easier consumption of the context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
  );

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  const isLoggedIn = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
