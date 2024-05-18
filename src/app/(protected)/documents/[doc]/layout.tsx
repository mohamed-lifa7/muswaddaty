import DocNotFound from "@/components/notfound";
import { getDocById } from "@/data/doc";
import { currentUser } from "@/server/auth";
import React from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const DocLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { doc: string };
}) => {
  const user = await currentUser();
  const doc = await getDocById(params.doc);
  if (!doc) return <DocNotFound />;
  if (
    doc.ownerId !== user?.id &&
    doc.collaborators.every((c) => c !== user?.id)
  )
    return <DocNotFound />;
  return (
    <main className="flex flex-col w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/documents">Documents</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{doc.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>{children}</div>
    </main>
  );
};

export default DocLayout;
