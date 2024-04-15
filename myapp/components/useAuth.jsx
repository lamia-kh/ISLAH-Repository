import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
        }

        setIsAuthenticated(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [cookies]);

  return isAuthenticated;
};

export default useAuth;
