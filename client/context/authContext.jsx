import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const BASE_URL = "https://haven-post.vercel.app/api";

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      { username, password },
      { withCredentials: true }
    );
    setCurrentUser(res.data);

    return res;
  };
  const logout = async () => {
    const res = await axios.post(`${BASE_URL}/auth/logout`, {
      withCredentials: true,
    });
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
