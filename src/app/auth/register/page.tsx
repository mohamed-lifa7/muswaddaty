import { RegisterForm } from "@/components/auth/register-form";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site-config";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Muswaddaty Inc account to start creating, editing, and collaborating on documents with ease. Join us today and enhance your productivity!"
};

const RegisterPage = () => {
  return (
    <div className="container relative grid flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Icons.logo className="mr-2 h-8 w-8" />
          {siteConfig.title.default} Inc
        </div>
        <div className="relative z-20 mt-auto">
          <h1 className="text-4xl font-bold">Collaborate, Create, and Share</h1>
          <p className="mt-4 text-lg">Your ultimate online text editor</p>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
