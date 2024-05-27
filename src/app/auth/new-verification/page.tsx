import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Account Verification",
  description:
    "Verify your Muswaddaty Inc account to access all features and start collaborating. Check your email for the verification link.",
};

const NewVerificationPage = () => {
  return <NewVerificationForm />;
};

export default NewVerificationPage;