import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthStatus from "./components/AuthStatus.js";
import Login from "./components/Login.js";

function App() {
  const [success = false, setSuccess] = useState();
  const [token = "", setToken] = useState();

  const setUser = (json) => {
    setSuccess(json.success);
    setToken(json.token);
  };

  const getUser = () => {
    return {
      success: success,
      token: token,
    };
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthStatus getUser={getUser} />,
    },
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
