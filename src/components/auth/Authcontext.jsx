import React, { createContext, useContext, useState, useEffect } from "react";

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
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");

    // Check if the essential details are present before considering the user logged in
    if (userId && token) {
      return { userId, token, email, name }; // Include email and name in the user object
    } else {
      return null;
    }
  };

  const [user, setUser] = useState(getUserDataFromStorage);

  useEffect(() => {
    // Optionally, listen for local storage changes to update user state.
    // Useful if your app can have changes in auth state from different tabs.
    const handleStorageChange = () => {
      setUser(getUserDataFromStorage());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = ({ userId, token, email, name }) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email); // Persist email
    localStorage.setItem("name", name); // Persist name
    setUser({ userId, token, email, name });
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // Clear email
    localStorage.removeItem("name"); // Clear name
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
