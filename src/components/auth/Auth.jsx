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

