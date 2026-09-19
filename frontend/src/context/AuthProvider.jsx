import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import AuthContext from "./AuthContext";


const TOKEN_KEY = "mh_token";


function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD CURRENT USER
  // =====================================================

  async function loadUser() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(
        "/api/auth/me"
      );

      setUser(response.data);

    } catch (error) {
      console.error(
        "Authentication check failed:",
        error
      );

      localStorage.removeItem(TOKEN_KEY);

      setUser(null);

    } finally {
      setLoading(false);
    }
  }


  // =====================================================
  // CHECK AUTH WHEN APP STARTS
  // =====================================================

  useEffect(() => {
    loadUser();
  }, []);


  // =====================================================
  // LOGIN
  // =====================================================

  async function login(email, password) {
    const response = await api.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      TOKEN_KEY,
      response.data.access_token
    );

    setUser(
      response.data.user
    );

    return response.data.user;
  }


  // =====================================================
  // REGISTER
  // =====================================================

  async function register(
    full_name,
    email,
    password
  ) {
    const response = await api.post(
      "/api/auth/register",
      {
        full_name,
        email,
        password,
      }
    );

    localStorage.setItem(
      TOKEN_KEY,
      response.data.access_token
    );

    setUser(
      response.data.user
    );

    return response.data.user;
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function logout() {
    localStorage.removeItem(
      TOKEN_KEY
    );

    setUser(null);
  }


  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const contextValue = {
    user,
    loading,
    login,
    register,
    logout,
  };


  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}


export default AuthProvider;