import { createContext, useContext, useMemo, useState } from "react";
import { apiRequest } from "../services/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("gympro_token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("gympro_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function saveSession(authData) {
    localStorage.setItem("gympro_token", authData.token);
    localStorage.setItem("gympro_user", JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  }

  async function register(formData) {
    const data = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(formData)
    });
    saveSession(data);
    return data;
  }

  async function login(formData) {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(formData)
    });
    saveSession(data);
    return data;
  }

  function logout() {
    localStorage.removeItem("gympro_token");
    localStorage.removeItem("gympro_user");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      login,
      logout,
      register,
      token,
      user
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
