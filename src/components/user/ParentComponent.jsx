// Parent component where the authentication context is available
import React from "react";
import { useAuth } from "../auth/Authcontext";
import UserAppointment from "./UserAppointment";

function ParentComponent() {
  const auth = useAuth(); // Get authentication context
  const user_Id = auth.user ? auth.user.user_Id : null; // Extract user_Id from user data

  return (
    <div>
      <UserAppointment user_Id={user_Id} />
    </div>
  );
}

export default ParentComponent;
