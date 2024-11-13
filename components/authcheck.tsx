// components/AuthCheck.tsx
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hook/useAuth"; // Import your useAuth hook

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = ({ children }: AuthCheckProps) => {
  const isLoggedIn = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/userlogin"); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>Loading...</div>; // Or some loading spinner, until the redirect occurs
  }

  return <>{children}</>; // If logged in, render children (protected content)
};

export default AuthCheck;
