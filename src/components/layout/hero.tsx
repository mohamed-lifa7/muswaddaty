import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/server/auth";
import { SquaresPattern } from "./squares-pattern";
import { Badge } from "../ui/badge";

const Hero = async () => {
  const user = await currentUser();
  return (
    <section>
      <SquaresPattern />
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <Badge className="px-4 my-5">Brand new</Badge>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-primary md:text-5xl lg:text-6xl">
          Your Ideas, Documents. Welcome to Muswaddaty
        </h1>
        <p className="mb-8 text-lg font-normal text-muted-foreground sm:px-16 lg:text-xl xl:px-48">
          Our online editor allows you to create, edit, and share documents
          wherever you are. No installation required.
        </p>
        <div className="mb-8 flex  justify-center space-x-4 lg:mb-16">
          {!user && (
            <LoginButton asChild>
              <Button size="lg">Sign in</Button>
            </LoginButton>
          )}
          <Button className="group" asChild variant="outline" size="lg">
            <Link rel="noopener noreferrer" href="/documents">
              <span className="flex items-center">
                Get started
                <ChevronRight className="ml-2 transform transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;