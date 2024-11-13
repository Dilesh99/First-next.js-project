// hooks/useAuth.ts
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check for a token in localStorage (or sessionStorage)
    const token = localStorage.getItem("authToken"); // You can use sessionStorage or another approach
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
};

export default useAuth;
