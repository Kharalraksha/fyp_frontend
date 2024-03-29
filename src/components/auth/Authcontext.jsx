import React, { createContext, useContext, useState } from "react";

// Create the context with a default value
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const getUserDataFromStorage = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (userId && token) {
      return { userId, token };
    } else {
      return null;
    }
  };

  const [user, setUser] = useState(getUserDataFromStorage);

  // Function to update user data when logging in
  const login = ({ userId, token }) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    setUser({ userId, token }); // Make sure user object contains userId
  };

  // Function to clear user data when logging out
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);
