import { currentUser } from "@/server/auth";
import { UserRole } from "@prisma/client";
import Sidebar from "./_components/sidebar";
import { Separator } from "@/components/ui/separator";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const user = await currentUser();
  if (user?.role !== UserRole.ADMIN) {
    return (
      <div className="mt-8 flex min-h-screen w-full items-center justify-center px-3 py-8 text-center md:container">
        <div>
          <h1 className="text-9xl font-bold">403</h1>
          <h2 className="text-xl font-bold">Forbidden</h2>
          <p className="text-lg text-muted-foreground">
            You are not authorized to access this page
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen overflow-hidden md:container rtl:flex-row-reverse">
      <Sidebar />
      <Separator orientation="vertical" className="hidden md:block"/>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
