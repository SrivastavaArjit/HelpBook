import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/login.jsx";
import ChatRoom from "./pages/agent/agent.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/agent",
    element: (
      <UserContextProvider>
        <ChatRoom />
      </UserContextProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    <RouterProvider router={router} />
  </React.StrictMode>
);
