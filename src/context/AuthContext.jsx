import React,{ createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("fake_jwt") || null);

  const login = (email, password) => {
    if (email && password ) {
      const fakeToken = "FAKE_JWT_TOKEN_12345";
      localStorage.setItem("fake_jwt", fakeToken);
      setToken(fakeToken);
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("fake_jwt");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
