import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getAllUsers } from "@/data/user";
import { columns } from "../_components/users/columns";
import { DataTable } from "../../../../components/ui/data-table";

export default async function page() {
  const { users } = await getData();
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full">
          <div className="my-4">
            <h2 className="text-2xl font-bold">User ({users.length})</h2>
            <p className="text-muted-foreground">Here are all the users</p>
          </div>
          <DataTable columns={columns} data={users} />
        </div>
      </div>
    </>
  );
}

const getData = async () => {
  const users = await getAllUsers();
  return { users };
};
