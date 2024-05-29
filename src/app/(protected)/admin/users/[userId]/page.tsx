import { UserInfo } from "@/components/user-info";
import { getUserById } from "@/data/user";

const AdminDashboardUser = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const user = await getUserById(params.userId);
  return (
    <div className="flex h-full items-center justify-center">
      <UserInfo user={user} label="User Information" />
    </div>
  );
};

export default AdminDashboardUser;
