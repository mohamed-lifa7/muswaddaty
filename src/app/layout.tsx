import { auth } from "@/server/auth";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site-config";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteFooter } from "@/components/layout/site-footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { Separator } from "@/components/ui/separator";
import type { Viewport } from "next";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  ...siteConfig,
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={cn("min-h-screen font-sans", inter.variable)}>
          <Suspense>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <EdgeStoreProvider>
                <SiteHeader />
                <TooltipProvider>{children}</TooltipProvider>
                <Separator />
                <SiteFooter />
                <Toaster />
              </EdgeStoreProvider>
            </ThemeProvider>
          </Suspense>
        </body>
      </html>
    </SessionProvider>
  );
}
