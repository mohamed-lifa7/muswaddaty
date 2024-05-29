import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { DataTable } from "@/components/ui/data-table";
import { getAllDocs } from "@/data/doc";
import { columns } from "../_components/docs/columns";

export default async function page() {
  const { docs } = await getData();
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
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-full">
          <div className="my-4">
            <h2 className="text-2xl font-bold">Documents ({docs.length})</h2>
            <p className="text-muted-foreground">Here are all the documents</p>
          </div>
          <DataTable columns={columns} data={docs} />
        </div>
      </div>
    </>
  );
}

const getData = async () => {
  const docs = await getAllDocs();
  return { docs };
};
