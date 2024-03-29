import React, { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      {isSignIn ? (
        <SigninForm toggle={toggleForm} />
      ) : (
        <SignupForm toggle={toggleForm} />
      )}
    </div>
  );
};

// export default AuthPage;
// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setIsLoggedIn(true);
//   };
//   v;
//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//   };

//   const value = {
//     isLoggedIn,
//     login,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
