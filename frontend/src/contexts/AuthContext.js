import { useState, createContext, useContext, useEffect } from "react";
import { fetchLogout, fetchMe } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("access-token");
        if (!token) {
          setLoading(false);
          return;
        }
        const me = await fetchMe();
        if (me && Object.keys(me).length > 0) {
          setUser(me);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          localStorage.removeItem("access-token");
          localStorage.removeItem("refresh-token");
        }
      } catch (e) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = (data) => {
    if (data && data.accessToken && data.user) {
      setLoggedIn(true);
      setUser(data.user);
      localStorage.setItem("access-token", data.accessToken);
      localStorage.setItem("refresh-token", data.refreshToken || "");
    } else {
      throw new Error("Invalid login data");
    }
  };

  const logout = async () => {
    try {
      await fetchLogout();
    } catch (e) {
      console.error("Logout failed:", e);
    }
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" />
      </Flex>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };