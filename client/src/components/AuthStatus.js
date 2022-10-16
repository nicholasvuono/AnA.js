import React from "react";

function AuthStatus(props) {
  const user = props.getUser();
  return <h3> Authenticated User: {user.success.toString()}</h3>;
}

export default AuthStatus;
