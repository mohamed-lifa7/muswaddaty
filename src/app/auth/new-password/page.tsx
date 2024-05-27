import { NewPasswordForm } from "@/components/auth/new-password-form";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Set New Password",
  description: "Set a new password for your Muswaddaty Inc account. Ensure your account remains secure by choosing a strong password."
};

const NewPasswordPage = () => {
  return ( 
    <NewPasswordForm />
   );
}
 
export default NewPasswordPage;