import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import UserMenu from "@/components/user/user-menu";
import { currentUser } from "@/server/auth";
import { ThemeToggle } from "../theme/theme-toggle";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { links } from "@/config/site-config";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export async function SiteHeader() {
  const user = await currentUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center space-x-2">
            {user && <UserMenu user={user} />}
            {!user && (
              <LoginButton asChild>
                <Button>Sign in</Button>
              </LoginButton>
            )}
            <ThemeToggle />
            <Button asChild variant="ghost" size="icon" className="rounded-full">
              <Link href={links.github}>
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]"/>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
