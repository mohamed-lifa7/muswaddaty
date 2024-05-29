import AddNewDoc from "./_components/newDoc";
import { currentUser } from "@/server/auth";
import { DataTable } from "../../../components/ui/data-table";
import { columns } from "./_components/columns";
import CopyIdComponent from "@/components/copy-id";
import type { Metadata } from "next";
import { getAllDocsForCollaborator, getAllDocsForUser } from "@/data/doc";

export const metadata: Metadata = {
  title: "Documents",
  description: "View all your documents and collaborate with others.",
};

const DocumentsPage = async () => {
  const user = await currentUser();
  if (!user) return null;
  const docs = await getData(user.id!);
  return (
    <main className="container my-4 h-screen w-full space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
        <AddNewDoc />
        <p className="max-md:text-sm">
          <span className="font-bold">Your ID</span> : {user.id}{" "}
          <CopyIdComponent id={user.id!} />{" "}
        </p>
      </div>

      <div className="w-full">
        <div className="my-4">
          <h2 className="text-2xl font-bold">Your Documents ({docs.length})</h2>
          <p className="text-muted-foreground">
            Here are all the documents you have created.
            <br />
            You can also view the documents where you are a collaborator.
          </p>
        </div>
        <DataTable columns={columns} data={docs} />
      </div>
    </main>
  );
};

export default DocumentsPage;

const getData = async (userId: string) => {
  const userDocs = await getAllDocsForUser(userId);
  const collabDocs = await getAllDocsForCollaborator(userId);
  return [...userDocs, ...collabDocs];
};
