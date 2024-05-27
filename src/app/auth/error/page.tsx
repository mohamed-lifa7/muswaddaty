import { ErrorCard } from "@/components/auth/error-card";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Authentication Error",
  description: "An error occurred during authentication. Please try again or contact support if the issue persists."
};

const AuthErrorPage = () => {
  return ( 
    <ErrorCard />
  );
};
 
export default AuthErrorPage;
