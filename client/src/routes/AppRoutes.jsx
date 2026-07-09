import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import Attendance from "../pages/Attendance.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Members from "../pages/Members.jsx";
import Register from "../pages/Register.jsx";
import Workouts from "../pages/Workouts.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "members",
        element: <Members />
      },
      {
        path: "attendance",
        element: <Attendance />
      },
      {
        path: "workouts",
        element: <Workouts />
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);
